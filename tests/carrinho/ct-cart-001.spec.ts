// tests/carrinho/ct-cart-001.spec.ts
import { test, expect } from '@playwright/test';

test('CT-CART-001 — Remover item do carrinho', async ({ page }) => {
  // Suposições: credenciais padrão do site de demonstração
  const baseUrl = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  // 1) Acessar a página de login
  await page.goto(baseUrl);

  // 2) Preencher credenciais e logar
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');

  // 3) Verificar que chegamos na página de listagem de produtos
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  // 4) Ação determinística: sempre adicionar o primeiro produto ao carrinho
  // Assim garantimos a pré-condição sem depender do estado anterior.
  const firstAddButton = page.locator('button:has-text("Add to cart")').first();
  await firstAddButton.click();

  // 5) Verificar que o badge do carrinho mostra exatamente "1"
  // (estado conhecido — adicionamos exatamente 1 item)
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toBeVisible();
  await expect(cartBadge).toHaveText('1');

  // 6) Ir para a página do carrinho
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/.*cart.html/);
  await expect(page.locator('.cart_list')).toBeVisible();

  // 7) Verificar que existe exatamente 1 item na lista do carrinho (pré-condição estabelecida acima)
  const cartItems = page.locator('.cart_item');
  await expect(cartItems).toHaveCount(1);

  // 8) Clicar em "Remove" do item que adicionamos
  await page.locator('button:has-text("Remove")').first().click();

  // 9) Resultado esperado (determinístico):
  // Como adicionamos exatamente 1 item, após remover a lista deve ficar com 0 itens
  // e o badge do carrinho deve desaparecer.
  await expect(cartItems).toHaveCount(0);
  await expect(cartBadge).not.toBeVisible();
});