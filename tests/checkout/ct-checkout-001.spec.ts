// tests/ct-checkout-001.spec.ts
import { test, expect } from '@playwright/test';

test('CT-Checkout-001 — Efetuar Compra Com Sucesso (Ir para Checkout)', async ({ page }) => {
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
  await expect(page).toHaveURL(/.*inventory.html/);

  // 2) Adicionar um item ao carrinho
  await page.locator('button:has-text("Add to cart")').first().click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // 3) Acessar a página "Carrinho"
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/.*cart.html/);
  await expect(page.locator('.cart_item')).toHaveCount(1); // Garante que o item está listado

  // --- Passo a Passo ---
  // 1) Clicar em "Checkout"
  await page.click('#checkout');

  // --- Resultado Esperado ---
  // O usuário será redirecionado para a página de compra (informações)
  await expect(page).toHaveURL(/.*checkout-step-one.html/);
  await expect(page.locator('.checkout_info_wrapper')).toBeVisible();
  await expect(page.locator('span.title')).toHaveText('Checkout: Your Information');
});