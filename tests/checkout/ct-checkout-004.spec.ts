// tests/ct-checkout-004.spec.ts
import { test, expect } from '@playwright/test';

test('CT-Checkout-004 — Deixar "Zip/Postal Code" em branco', async ({ page }) => {
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
  // 1) Preencher "First Name" e "Last Name"
  await page.fill('#first-name', 'Test');
  await page.fill('#last-name', 'User');
  
  // 2) Clicar em Continue
  await page.click('#continue');

  // --- Resultado Esperado ---
  // Aparecer mensagem de erro "Error: Postal Code is required"
  const errorMessage = page.locator('h3[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Error: Postal Code is required');
});