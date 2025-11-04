// tests/overview/ct-overview-001.spec.ts
import { test, expect } from '@playwright/test';

test('CT-OVERVIEW-001 — Cancelar ação de Overview', async ({ page }) => {
  const baseUrl = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  // 1) Acessar a página de login
  await page.goto(baseUrl);

  // 2) Login
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');
  await expect(page).toHaveURL(/.*inventory.html/);

  // 3) Adicionar o primeiro produto ao carrinho
  await page.locator('button:has-text("Add to cart")').first().click();
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');

  // 4) Acessar o carrinho
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/.*cart.html/);

  // 5) Prosseguir para Checkout
  await page.click('button:has-text("Checkout")');
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  // 6) Preencher informações obrigatórias
  await page.fill('#first-name', 'Maria');
  await page.fill('#last-name', 'Fernandes');
  await page.fill('#postal-code', '50000-000');
  await page.click('input[type="submit"]');
  await expect(page).toHaveURL(/.*checkout-step-two.html/);

  // 7) Confirmar que estamos na página de Overview
  await expect(page.locator('.summary_info')).toBeVisible();

  // 8) Clicar em “Cancel”
  await page.click('button:has-text("Cancel")');

  // 9) Resultado esperado: o usuário deve retornar à página de Checkout (etapa 1)
  await expect(page).toHaveURL(/.*inventory.html|.*cart.html|.*checkout-step-one.html/);
});
