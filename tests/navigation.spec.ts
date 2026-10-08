import { test, expect } from '@playwright/test';
import { projects } from '../src/content/projects';

test('todas as páginas selecionadas têm case e imagens locais válidas', async ({ page }) => {
  const broken: string[] = [];
  page.on('response', response => { if (response.url().includes('/images/projects/') && response.status() >= 400) broken.push(response.url()); });
  for (const project of projects) {
    await page.goto(`/projects/${project.slug}`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(project.title);
    const cover = page.locator('.case-cover img');
    await expect(cover).toBeVisible();
    await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await page.locator('.gallery').scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator('.gallery img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(page.getByRole('link', { name: 'Ver repositório' })).toHaveAttribute('href', project.repository!);
  }
  expect(broken).toEqual([]);
});

test('abre case, permite refresh, próximo projeto e retorno', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  // Click the first card in the works wheel to open the project
  await page.locator('.ww-card').first().click();
  await expect(page).toHaveURL(/projects\/carol-lab-v3/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('.case-cover .project-visual')).toHaveCSS('view-transition-name', 'none');
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('link', { name: '← Voltar aos projetos' }).last().click();
  await expect(page).toHaveURL(/\/#work/);
  expect(errors).toEqual([]);
});

test('reduced motion mantém conteúdo visível e navegação por teclado', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  // Focus the first wheel card and press Enter
  await page.locator('.ww-card').first().focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/projects\/carol-lab-v3/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

for (const width of [360, 768, 1024, 1440, 1920]) {
  test(`sem overflow horizontal em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (width === 360 || width === 1440) {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.reload();
      await page.screenshot({ path: `artifacts/home-${width}.png`, fullPage: true });
if (width === 1440) {
        await page.screenshot({ path: 'artifacts/final-home-desktop.png' });
        await page.locator('#work').screenshot({ path: 'artifacts/vertical-projects-desktop.png' });
        await page.locator('#work .ww-card').first().screenshot({ path: 'artifacts/final-project-desktop.png' });
      }
    }
    await page.goto('/projects/carol-lab-v3');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

test('menu mobile abre, navega e fecha com Escape', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Menu +' }).click();
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation')).toBeHidden();
  await page.getByRole('button', { name: 'Menu +' }).click();
  await page.getByRole('link', { name: 'Sobre', exact: true }).click();
  await expect(page).toHaveURL(/#about/);
  await expect(page.getByRole('navigation')).toBeHidden();
});

test('slug desconhecido tem retorno acessível', async ({ page }) => {
  await page.goto('/projects/nao-existe');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Vamos voltar');
  await page.getByRole('link', { name: 'Ir para a homepage' }).click();
  await expect(page).toHaveURL('/');
});



