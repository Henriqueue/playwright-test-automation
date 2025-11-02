// tests/ct-prod_pag-001.spec.ts
// Caso de Teste: CT-PROD_Pag-001 — Adicionar Produto ao carrinho
// Objetivo: Adicionar produto ao carrinho
// Pré-condições: O usuário tem acesso à URL de login: https://www.saucedemo.com/

import { test, expect } from '@playwright/test';

test('CT-PROD_Pag-001 — Adicionar Produto ao carrinho', async ({ page }) => {
  // Dados de teste / credenciais (site de demonstração)
  const baseUrl = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  // 1) Acessar a página de login
  // Descrição: Navega até a URL base do site.
  await page.goto(baseUrl);

  // 2) Preencher credenciais e logar
  // Descrição: Localiza os campos de usuário e senha e clica no botão de login.
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');

  // 3) Verificar que chegamos na página de listagem de produtos (inventory)
  // Descrição: Espera que a URL contenha 'inventory.html' e que a lista de produtos esteja visível.
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  // 4) Capturar o nome do primeiro produto visível (para validação posterior)
  // Descrição: Armazena o texto do primeiro item para comparar com o que aparecerá no carrinho.
  const firstProductNameLocator = page.locator('.inventory_item .inventory_item_name').first();
  const firstProductNameRaw = await firstProductNameLocator.textContent();
  const firstProductName = firstProductNameRaw ? firstProductNameRaw.trim() : '';

  // 5) Clicar no botão "Add to cart" do primeiro produto visível
  // Descrição: Seleciona o primeiro botão com o texto "Add to cart" e realiza o clique.
  const firstAddButton = page.locator('button:has-text("Add to cart")').first();
  await firstAddButton.click();

  // 6) Verificar o indicador de quantidade no ícone do carrinho
  // Descrição: O badge do carrinho deve aparecer com o número '1'.
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toBeVisible();
  await expect(cartBadge).toHaveText('1');

  // 7) Navegar para a página do carrinho
  // Descrição: Clica no ícone do carrinho e valida que estamos na página de carrinho.
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/.*cart.html/);

  // 8) Verificar que o produto adicionado está listado na página do carrinho
  // Descrição: A página do carrinho deve mostrar um .cart_item com o mesmo nome do produto adicionado.
  const cartItemNameLocator = page.locator('.cart_item .inventory_item_name').first();
  await expect(cartItemNameLocator).toBeVisible();
  await expect(cartItemNameLocator).toHaveText(firstProductName);

  // Observação: Se desejar, podemos adicionar checagens extras (preço, quantidade, imagem, etc.).
});
