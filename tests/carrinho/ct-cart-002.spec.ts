// tests/carrinho/ct-cart-002.spec.ts
import { test, expect } from '@playwright/test';

test('CT-CART-002 — Continuar Comprando (voltar para lista de produtos)', async ({ page }) => {
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
  // (garante a pré-condição)
  await page.locator('button:has-text("Add to cart")').first().click();

  // 5) Acessar o carrinho através do ícone
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/.*cart.html/);
  await expect(page.locator('.cart_list')).toBeVisible();

  // 6) Clicar no botão "Continue Shopping" para retornar à lista de produtos
  // (usa o id padrão do demo; se no projeto for diferente, ajuste o seletor)
  await page.click('#continue-shopping');

  // 7) Verificar que voltamos exatamentemente para a página de inventário
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();
});