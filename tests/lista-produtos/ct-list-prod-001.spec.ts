// tests/ct-list-prod-001.spec.ts
import { test, expect } from '@playwright/test';

test('CT-LIST-PROD-001 — Adicionar item único ao carrinho', async ({ page }) => {
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
  // (espera por um elemento específico da página de inventário)
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  // 4) Clicar no botão "Add to cart" do primeiro produto visível
  // Usamos um seletor genérico: o primeiro botão com texto "Add to cart"
  const firstAddButton = page.locator('button:has-text("Add to cart")').first();
  await firstAddButton.click();

  // 5) Verificar o indicador de quantidade no ícone do carrinho
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toBeVisible();
  await expect(cartBadge).toHaveText('1');
});
