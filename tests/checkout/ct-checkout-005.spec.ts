// tests/ct-checkout-005.spec.ts
import { test, expect } from '@playwright/test';

test('CT-Checkout-005 — Continuar para página de confirmação (Overview)', async ({ page }) => {
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

  // 3) Preencher todos os campos
  await page.fill('#first-name', 'Test');
  await page.fill('#last-name', 'User');
  await page.fill('#postal-code', '12345');

  // --- Passo a Passo ---
  // 1) Clicar em "Continue"
  await page.click('#continue');

  // --- Resultado Esperado ---
  // O usuário será redirecionado para a página de confirmação (Overview)
  await expect(page).toHaveURL(/.*checkout-step-two.html/);
  await expect(page.locator('span.title')).toHaveText('Checkout: Overview');
  await expect(page.locator('.checkout_summary_container')).toBeVisible();
});