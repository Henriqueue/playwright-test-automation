// tests/listagem-produtos/ct-list-prod-002.spec.ts
import { test, expect } from '@playwright/test';

test('CT-LIST-PROD-002 — Adicionar mais de um tipo de item ao carrinho', async ({ page }) => {
  // Configurações / suposições
  const baseUrl = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  // Número de itens que queremos adicionar (três, como exemplo, pode-se alterar)
  const itemsToAdd = 3;

  // 1) Acessar a página de login
  await page.goto(baseUrl);

  // 2) Efetuar login (pré-condição: usuário deve estar logado)
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');

  // 3) Verificar que chegamos à página de listagem de produtos
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  // 4) Localizar todos os botões "Add to cart"
  const addButtons = page.locator('button:has-text("Add to cart")');
  const available = await addButtons.count();

  // Assegura que haja itens para adicionar
  test.expect(available).toBeGreaterThan(0);

  // 5) Clicar em 'Add to cart' nos primeiros N itens (ou em todos, se preferir)
  const toClick = Math.min(itemsToAdd, available);
  for (let i = 0; i < toClick; i++) {
    await addButtons.nth(i).click();
  }

  // 6) Verificar o indicador do carrinho com a quantidade correta
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toBeVisible();
  await expect(cartBadge).toHaveText(String(toClick));
});
