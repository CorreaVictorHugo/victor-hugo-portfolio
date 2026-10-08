// Gera prévias das cópias públicas em .reference, sem publicar os sites.
import { createServer } from 'node:http';
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { chromium } from '@playwright/test';
import sharp from 'sharp';

const sources = [
  ['landing_page_carol_V3', 'carol-lab-v3'],
  ['landin_page_Carol_V2', 'carol-lab-v2'],
  ['Landing_Page_Caroline', 'carol-lab-v1'],
  ['Landing_page_Veterinaria', 'bianca-cabral'],
  ['Landing_Page_Fast_Cell', 'fast-cell'],
  ['site_bushido_jiu_jitsu', 'bushido'],
  ['landing-page-mecanica', 'victor-automoveis'],
];
const root = resolve('.reference');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.avif': 'image/avif', '.woff2': 'font/woff2', '.ttf': 'font/ttf' };
const server = createServer(async (request, response) => {
  const path = resolve(root, '.' + decodeURIComponent(new URL(request.url, 'http://localhost').pathname));
  if (!path.startsWith(root + sep)) { response.writeHead(403).end(); return; }
  try {
    response.setHeader('Content-Type', types[extname(path)] ?? 'application/octet-stream');
    response.end(await readFile(path));
  } catch { response.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(5190, '127.0.0.1', resolve));
const browser = await chromium.launch();
const inventory = [];
try {
  for (const [repository, slug] of sources) {
    const folders = await readdir(resolve(root, repository), { withFileTypes: true });
    const folder = folders.find(entry => entry.isDirectory()).name;
    const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, reducedMotion: 'reduce' });
    await page.goto(`http://127.0.0.1:5190/${repository}/${folder}/index.html`, { waitUntil: 'networkidle', timeout: 45000 });
    await page.evaluate(async () => { await document.fonts.ready; });
    const directory = resolve('public/images/projects', slug);
    await mkdir(directory, { recursive: true });
    const cover = await page.screenshot();
    await sharp(cover).webp({ quality: 85 }).toFile(resolve(directory, 'cover.webp'));
    await sharp(cover).resize(720).webp({ quality: 82 }).toFile(resolve(directory, 'cover-720.webp'));
    // Galeria registra um recorte real da página, sem criar dados ou mockups.
    await page.evaluate(() => window.scrollTo({ top: Math.min(1000, document.documentElement.scrollHeight - window.innerHeight), behavior: 'instant' }));
    const detail = await page.screenshot();
    await sharp(detail).webp({ quality: 85 }).toFile(resolve(directory, 'detail.webp'));
    inventory.push({ repository, slug, title: await page.title(), cover: `/images/projects/${slug}/cover.webp`, width: 1440, height: 960 });
    console.log(`${slug}: imagens geradas`);
    await page.close();
  }
  await writeFile('artifacts/project-sources.json', JSON.stringify(inventory, null, 2));
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
