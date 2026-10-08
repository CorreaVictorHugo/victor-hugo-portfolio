import { test, expect } from '@playwright/test';
  test.use({ viewport: { width: 1440, height: 900 }, video: { mode: 'on', size: { width: 1440, height: 900 } } });

  test('imagem do projeto conecta à imagem do case e volta', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/#work');
    // Click the first card in the works wheel
    const firstCard = page.locator('.ww-card').first();
    await firstCard.scrollIntoViewIfNeeded();
    await expect.poll(() => firstCard.locator('img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await firstCard.click();
    await expect(page).toHaveURL(/projects\/carol-lab-v3/);
    await expect(page.locator('.case-cover .project-visual')).toHaveCSS('view-transition-name', 'none');
    await page.screenshot({ path: 'artifacts/final-case-desktop.png' });
    await page.getByRole('link', { name: '← Voltar aos projetos' }).first().click();
    await expect(page).toHaveURL(/\/#work/);
  });

