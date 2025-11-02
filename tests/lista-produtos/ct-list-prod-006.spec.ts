// tests/listagem-produtos/ct-list-prod-006.spec.ts
import { test, expect } from '@playwright/test';

function parsePrice(text: string) {
  // Remove símbolo de moeda e converte para número (ex: "$29.99" -> 29.99)
  return Number(text.replace(/[^0-9.,-]+/g, '').replace(',', '.'));
}

test('CT-LIST-PROD-006 — Filtrar Price (low to high)', async ({ page }) => {
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

  // 3) Aplicar filtro "Price (low to high)"
  await page.selectOption('.product_sort_container', { label: 'Price (low to high)' });

  // 4) Ler os preços visíveis na ordem atual
  const priceStrings = await page.locator('.inventory_item_price').allTextContents();
  const prices = priceStrings.map(parsePrice);

  // 5) Gerar a versão ordenada esperada (crescente)
  const expected = [...prices].sort((a, b) => a - b);

  // 6) Validar que a ordem atual é a mesma da ordenação crescente
  expect(prices).toEqual(expected);
});
