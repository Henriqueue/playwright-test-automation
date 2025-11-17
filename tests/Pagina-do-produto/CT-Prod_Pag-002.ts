import { test, expect } from '@playwright/test';

test('CT-Prod_Pag-002 — Voltar para a página de produtos', async ({ page }) => {
  const baseUrl = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  // 1) Login
  await page.goto(baseUrl);
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');

  // 2) Verifica se está na lista de produtos
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  // 3) Abre o primeiro produto
  const firstProduct = page.locator('.inventory_item_name').first();
  await firstProduct.click();

  // 4) Verifica se abriu os detalhes
  await expect(page.locator('.inventory_details')).toBeVisible();

  // 5) Clica no botão voltar (SEM IF)
  await page.click('#back-to-products');

  // 6) Verifica retorno
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();
});
