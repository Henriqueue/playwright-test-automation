// tests/ct-checkout-006.spec.ts
import { test, expect } from '@playwright/test';

test('CT-Checkout-006 — Cancelar ação de checkout', async ({ page }) => {
  // Suposições: credenciais padrão
  const baseUrl = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  // --- Pré-Condições ---
  // 1) Acessar e logar
  await page.goto(baseUrl);
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');

  // 2) Adicionar item e ir para a página de checkout
  await page.locator('button:has-text("Add to cart")').first().click();
  await page.click('.shopping_cart_link');
  await page.click('#checkout');
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  // --- Passo a Passo ---
  // 1) Clicar em "CANCEL"
  await page.click('#cancel');

  // --- Resultado Esperado ---
  // O usuário deve retornar à página de carrinho
  await expect(page).toHaveURL(/.*cart.html/);
  await expect(page.locator('span.title')).toHaveText('Your Cart');
  await expect(page.locator('.cart_list')).toBeVisible();
});