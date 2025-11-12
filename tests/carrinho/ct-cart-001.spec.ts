// tests/ct-cart-001.spec.ts
import { test, expect } from '@playwright/test';

test('CT-CART-001 — Acessar página de Carrinho', async ({ page }) => {
  // Definição da URL base e credenciais do usuário de teste
  const baseUrl = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  // Acessar o site de login da aplicação
  await page.goto(baseUrl);

  // Inserir o nome de usuário e senha válidos
  await page.fill('#user-name', username);
  await page.fill('#password', password);

  // Clicar no botão de login
  await page.click('#login-button');

  // Verificar se o login foi bem-sucedido
  // A URL deve mudar para "inventory.html" (listagem de produtos)
  await expect(page).toHaveURL(/.*inventory.html/);

  // Clicar no ícone do carrinho (canto superior direito)
  await page.click('.shopping_cart_link');

  // Verificar se a página do carrinho foi aberta
  await expect(page).toHaveURL(/.*cart.html/);

  // Confirmar se o elemento com a lista de itens do carrinho está visível
  await expect(page.locator('.cart_list')).toBeVisible();
});
