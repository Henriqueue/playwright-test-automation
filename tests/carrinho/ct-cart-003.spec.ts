// tests/ct-cart-003.spec.ts
import { test, expect } from '@playwright/test';

test('CT-CART-003 — Fazer Checkout', async ({ page }) => {
  // Configuração inicial: site e credenciais padrão
  const baseUrl = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  // Acessar a página principal de login
  await page.goto(baseUrl);

  // Preencher o nome de usuário e senha
  await page.fill('#user-name', username);
  await page.fill('#password', password);

  // Clicar no botão "Login" para entrar
  await page.click('#login-button');

  // Verificar se a navegação foi bem-sucedida (página de inventário)
  await expect(page).toHaveURL(/.*inventory.html/);

  // Adicionar um produto ao carrinho
  // Clica no primeiro botão "Add to cart" encontrado
  await page.locator('button:has-text("Add to cart")').first().click();

  // Abrir o carrinho clicando no ícone no canto superior direito
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/.*cart.html/);

  // Validar que há pelo menos um item no carrinho
  // Conta os elementos que representam os produtos
  const itemsInCart = await page.locator('.cart_item').count();
  expect(itemsInCart).toBeGreaterThan(0);

  // Clicar no botão "Checkout" para iniciar o processo de compra
  await page.click('#checkout');

  // Verificar se o usuário foi redirecionado para a primeira etapa do checkout
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  // Confirmar que o campo "First Name" está visível na página de checkout
  await expect(page.locator('input#first-name')).toBeVisible();
});
