// tests/ct-checkout-002.spec.ts
import { test, expect } from '@playwright/test';

test('CT-Checkout-002 — Deixar "First Name" em branco', async ({ page }) => {
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
  // 1) Preencher "Last Name" e "Zip/Postal Code", mas não "First Name"
  // (O teste especifica "deixar em branco", então preenchemos os outros para isolar o erro)
  await page.fill('#last-name', 'Test');
  await page.fill('#postal-code', '12345');
  
  // 2) Clicar em Continue
  await page.click('#continue');

  // --- Resultado Esperado ---
  // Aparecer mensagem de erro "Error: First Name is required"
  const errorMessage = page.locator('h3[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Error: First Name is required');
});