// tests/listagem-produtos/ct-list-prod-003.spec.ts
import { test, expect } from '@playwright/test';

test('CT-LIST-PROD-003 — Remover item do carrinho na página de produtos', async ({ page }) => {
  const baseUrl = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';
  const produto = 'Sauce Labs Backpack';

  // 1) Acessar login
  await page.goto(baseUrl);

  // 2) Logar
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');

  // 3) Confirmar inventário
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  // 4) Adicionar produto específico ao carrinho (se ainda não estiver adicionado)
  const card = page.locator('.inventory_item').filter({ hasText: produto });
  const addBtn = card.locator('button:has-text("Add to cart")');
  await expect(addBtn).toBeVisible();
  await addBtn.click();

  // 5) Verificar que o badge apareceu com "1"
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');

  // 6) Clicar em "Remove" no mesmo card
  const removeBtn = card.locator('button:has-text("Remove")');
  await expect(removeBtn).toBeVisible();
  await removeBtn.click();

  // 7) Resultado esperado: badge do carrinho deve desaparecer (count === 0)
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);

  // Alternativa/extra: verificar que o botão voltou a ser "Add to cart"
  await expect(addBtn).toBeVisible();
});

