// tests/pagina-produto/ct-prod_pag-001.spec.ts
import { test, expect } from '@playwright/test';

test('CT-PROD_Pag-001 — Adicionar produto ao carrinho', async ({ page }) => {
  const baseUrl = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  // 1) Acessar a página de login
  await page.goto(baseUrl);

  // 2) Efetuar login
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');

  // 3) Garantir que estamos na listagem de produtos
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  // 4) Abrir a página de detalhes do primeiro produto (clicar no nome do produto)
  const firstProductNameLocator = page.locator('.inventory_item_name').first();
  const productName = (await firstProductNameLocator.textContent())?.trim() ?? '';
  await firstProductNameLocator.click();

  // 5) Na página de produto, clicar em "Add to cart"
  // Seleciona o botão "Add to cart" dentro do container de detalhes para evitar seletores ambíguos
  const detailContainer = page.locator('.inventory_details_container, .inventory_details');
  const addBtn = detailContainer.locator('button:has-text("Add to cart")');
  await expect(addBtn).toBeVisible();
  await addBtn.click();

  // 6) Verificar que o badge do carrinho mostra "1"
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toBeVisible();
  await expect(cartBadge).toHaveText('1');

  // 7) Ir para a página do carrinho
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/.*cart.html/);

  // 8) Verificar que o produto adicionado está listado no carrinho
  const cartItemNameLocator = page.locator('.cart_item .inventory_item_name').filter({ hasText: productName }).first();
  await expect(cartItemNameLocator).toBeVisible();
  await expect(cartItemNameLocator).toHaveText(productName);
});
