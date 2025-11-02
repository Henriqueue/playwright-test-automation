// tests/listagem-produtos/ct-list-prod-004.spec.ts
import { test, expect } from '@playwright/test';

test('CT-LIST-PROD-004 — Filtrar items Name (A to Z)', async ({ page }) => {
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

  // 3) Selecionar filtro "Name (A to Z)" via label (mais robusto que value)
  await page.selectOption('.product_sort_container', { label: 'Name (A to Z)' });

  // 4) Ler todos os nomes de produto visíveis e verificar ordenação ascendente
  const names = await page.locator('.inventory_item_name').allTextContents();
  const sorted = [...names].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  // Asserção: a lista atual deve ser igual à lista ordenada (A -> Z)
  expect(names).toEqual(sorted);
});
