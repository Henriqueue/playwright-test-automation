// tests/carrinho/ct-cart-003.spec.ts
import { test, expect } from '@playwright/test';

test('CT-CART-003 — Fazer Checkout (efetuar compra com sucesso)', async ({ page }) => {
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

  // 4) Ação determinística: adicionar o primeiro produto ao carrinho
  await page.locator('button:has-text("Add to cart")').first().click();

  // 5) Verificar que o badge mostra "1" (estado previsível)
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toBeVisible();
  await expect(cartBadge).toHaveText('1');

  // 6) Ir para a página do carrinho
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/.*cart.html/);

  // 7) Verificar que existe exatamente 1 item na lista do carrinho
  const cartItems = page.locator('.cart_item');
  await expect(cartItems).toHaveCount(1);

  // 8) Clicar no botão "Checkout" para iniciar o fluxo de compra
  await page.locator('button:has-text("Checkout")').click();

  // 9) Verificar que foi redirecionado para a primeira etapa do checkout
  await expect(page).toHaveURL(/.*checkout-step-one.html/);
  await expect(page.locator('.checkout_info')).toBeVisible();
});