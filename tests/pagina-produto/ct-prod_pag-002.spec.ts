// tests/pagina-produto/ct-prod_pag-002.spec.ts
import { test, expect } from '@playwright/test';

test('CT-Prod_Pag-002 — Voltar para a página de produtos', async ({ page }) => {
  const baseUrl = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  // 1) Acessar login
  await page.goto(baseUrl);

  // 2) Logar
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');

  // 3) Conferir inventário
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  // 4) Abrir a página de detalhes do primeiro produto
  await page.locator('.inventory_item_name').first().click();

  // 5) Verificar que estamos na página de detalhes (seletor específico)
  // Usamos container de descrição que é único para a área de detalhe
  const detailsDesc = page.locator('.inventory_details_desc_container, .inventory_details_container');
  await expect(detailsDesc.first()).toBeVisible();

  // 6) Clicar no botão "Back to products"
  // No Swag Labs o botão possui data-test "back-to-products" — tentamos preservar robustez
  const backBtn = page.locator('button:has-text("Back to products"), [data-test="back-to-products"]');
  await expect(backBtn).toBeVisible();
  await backBtn.click();

  // 7) Resultado esperado: redirecionado para inventory.html e lista visível
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();
});
