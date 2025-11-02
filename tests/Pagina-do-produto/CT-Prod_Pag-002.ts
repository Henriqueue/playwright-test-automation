// tests/ct-prod_pag-002.spec.ts
// Caso de Teste: CT-Prod_Pag-002 — Voltar para a página de produtos
// Objetivo: Retornar para a página de lista de produtos
// Pré-condições: O usuário tem acesso à URL de login: https://www.saucedemo.com/

import { test, expect } from '@playwright/test';

test('CT-Prod_Pag-002 — Voltar para a página de produtos', async ({ page }) => {
  // Dados de teste / credenciais (site de demonstração)
  const baseUrl = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  // 1) Acessar a página de login
  // Descrição: Navega até a URL base do site.
  await page.goto(baseUrl);

  // 2) Preencher credenciais e efetuar login
  // Descrição: Localiza os campos de usuário e senha e clica no botão de login.
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');

  // 3) Verificar que chegamos na página de listagem de produtos (inventory)
  // Descrição: Espera que a URL contenha 'inventory.html' e que a lista de produtos esteja visível.
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  // 4) Acessar a página de detalhes do primeiro produto
  // Descrição: Clica no nome do primeiro produto para abrir a página de detalhe do item.
  const firstProductNameLocator = page.locator('.inventory_item .inventory_item_name').first();
  await firstProductNameLocator.click();

  // 5) Verificar que estamos na página de detalhes do produto
  // Descrição: A página de detalhe deve mostrar o container de detalhes do inventário.
  await expect(page.locator('.inventory_details')).toBeVisible();

  // 6) Clicar no botão "Back to products"
  // Descrição: Clica no botão que retorna à lista de produtos.
  // Observação: selector '#back-to-products' é usado quando disponível; como alternativa usamos o texto do botão.
  const backButton = page.locator('#back-to-products').first();
  if (await backButton.count() > 0) {
    await backButton.click();
  } else {
    // fallback: localizar pelo texto do botão (caso o ID seja diferente)
    await page.locator('button:has-text("Back to products")').click();
  }

  // 7) Resultado esperado: estar redirecionado para a página de produtos (inventory)
  // Descrição: Verifica a URL e a presença da lista de produtos.
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();
});
