// tests/overview/ct-overview-002.spec.ts
import { test, expect } from '@playwright/test';

test('CT-OVERVIEW-002 — Finalizar a compra', async ({ page }) => {
  const baseUrl = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  // 1) Login
  await page.goto(baseUrl);
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');
  await expect(page).toHaveURL(/.*inventory.html/);

  // 2) Adicionar um produto ao carrinho
  await page.locator('button:has-text("Add to cart")').first().click();
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');

  // 3) Ir para o carrinho
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/.*cart.html/);

  // 4) Prosseguir para Checkout
  await page.click('button:has-text("Checkout")');
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  // 5) Preencher as informações do cliente
  await page.fill('#first-name', 'Caio');
  await page.fill('#last-name', 'Dias');
  await page.fill('#postal-code', '50000-000');
  await page.click('input[type="submit"]');

  // 6) Confirmar que estamos na página de Overview
  await expect(page).toHaveURL(/.*checkout-step-two.html/);
  await expect(page.locator('.summary_info')).toBeVisible();

  // 7) Finalizar compra
  await page.click('button:has-text("Finish")');

  // 8) Verificar mensagem de sucesso
  const thankYouMessage = page.locator('.complete-header');
  await expect(thankYouMessage).toBeVisible();
  await expect(thankYouMessage).toHaveText('Thank you for your order!');

  // 9) (Opcional) Verificar que o botão "Back Home" aparece
  const backHomeButton = page.locator('button:has-text("Back Home")');
  await expect(backHomeButton).toBeVisible();
});
