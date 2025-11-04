<<<<<<< HEAD
// tests/listagem-produtos/ct-list-prod-007.spec.ts
import { test, expect } from '@playwright/test';

function parsePrice(text: string) {
  return Number(text.replace(/[^0-9.,-]+/g, '').replace(',', '.'));
}

test('CT-LIST-PROD-007 — Filtrar Price (high to low)', async ({ page }) => {
  const baseUrl = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  // 1) Acessar e logar
  await page.goto(baseUrl);
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');

  // 2) Confirmar inventário carregado
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  // 3) Aplicar filtro "Price (high to low)"
  await page.selectOption('.product_sort_container', { label: 'Price (high to low)' });

  // 4) Ler os preços visíveis na ordem atual
  const priceStrings = await page.locator('.inventory_item_price').allTextContents();
  const prices = priceStrings.map(parsePrice);

  // 5) Gerar a versão ordenada esperada (decrescente)
  const expectedDesc = [...prices].sort((a, b) => b - a);

  // 6) Validar que a ordem atual é a mesma da ordenação decrescente
  expect(prices).toEqual(expectedDesc);
});
=======
// tests/listagem-produtos/ct-list-prod-007.spec.ts
import { test, expect } from '@playwright/test';

function parsePrice(text: string) {
  return Number(text.replace(/[^0-9.,-]+/g, '').replace(',', '.'));
}

test('CT-LIST-PROD-007 — Filtrar Price (high to low)', async ({ page }) => {
  const baseUrl = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  // 1) Acessar e logar
  await page.goto(baseUrl);
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');

  // 2) Confirmar inventário carregado
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  // 3) Aplicar filtro "Price (high to low)"
  await page.selectOption('.product_sort_container', { label: 'Price (high to low)' });

  // 4) Ler os preços visíveis na ordem atual
  const priceStrings = await page.locator('.inventory_item_price').allTextContents();
  const prices = priceStrings.map(parsePrice);

  // 5) Gerar a versão ordenada esperada (decrescente)
  const expectedDesc = [...prices].sort((a, b) => b - a);

  // 6) Validar que a ordem atual é a mesma da ordenação decrescente
  expect(prices).toEqual(expectedDesc);
});
>>>>>>> 0bb30e5317e0b5be2e2851919eb99769e33dafd1
    