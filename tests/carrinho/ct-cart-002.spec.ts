// tests/ct-cart-002.spec.ts
import { test, expect } from '@playwright/test';

test('CT-CART-002 — Continuar Comprando', async ({ page }) => {
  // Credenciais e endereço base do site de testes
  const baseUrl = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  // Acessar a página de login
  await page.goto(baseUrl);

  // Preencher os campos de login
  await page.fill('#user-name', username);
  await page.fill('#password', password);

  // Enviar o formulário de login
  await page.click('#login-button');

  // Validar que o login foi concluído e estamos na listagem de produtos
  await expect(page).toHaveURL(/.*inventory.html/);

  // Adicionar o primeiro item disponível ao carrinho
  // O seletor procura o primeiro botão com o texto "Add to cart"
  const firstAddButton = page.locator('button:has-text("Add to cart")').first();
  await firstAddButton.click();

  // Clicar no ícone do carrinho para abrir a página de carrinho
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/.*cart.html/);

  // Clicar no botão "Continue Shopping"
  await page.click('#continue-shopping');

  // Confirmar que retornou para a página de produtos
  await expect(page).toHaveURL(/.*inventory.html/);

  // Verificar se a lista de produtos está visível novamente
  await expect(page.locator('.inventory_list')).toBeVisible();
});
