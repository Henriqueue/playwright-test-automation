// tests/listagem-produtos/ct-list-prod-005.spec.ts
import { test, expect } from '@playwright/test';

test('CT-LIST-PROD-005 — Filtrar items Name (Z to A)', async ({ page }) => {
  const baseUrl = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  // 1) Acessar e logar
  await page.goto(baseUrl);
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');

  // 2) Confirmar inventário
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  // 3) Selecionar filtro "Name (Z to A)"
  await page.selectOption('.product_sort_container', { label: 'Name (Z to A)' });

  // 4) Ler nomes e verificar ordenação descendente
  const names = await page.locator('.inventory_item_name').allTextContents();
  const sortedDesc = [...names].sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }));

  // Asserção: a lista atual deve ser igual à lista ordenada Z -> A
  expect(names).toEqual(sortedDesc);
});
