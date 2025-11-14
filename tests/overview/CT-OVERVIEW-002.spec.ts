import { test, expect } from '@playwright/test';

test('CT-OVERVIEW-001 - Cancelar ação de overview', async ({ page }) => {
    
  const baseUrl = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  //pagina de login, abrir a url
  await page.goto(baseUrl);

  //Logar
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');

  //adicionar item no carrinho
  await page.click('text=Add to cart');

  //ir pro carrinho
  await page.click('.shopping_cart_link');

  //garantir que está no carrinho
  //garantir que o item ta no carrinho
  await expect(page).toHaveURL(/.*cart.html/);
  const itemCount = await page.locator('.cart_item').count(); //ele conta quantos itens ta no carrinho
  await expect(itemCount).toBeGreaterThan(0);

  //ir pro checkout
  await page.click('#checkout');

  //preencher os campos de informações
  await page.fill('#first-name', 'Caio');
  await page.fill('#last-name', 'Dias');
  await page.fill('#postal-code', '12345');
  await page.click('#continue');

  //garantir que ta no overview
  await expect(page).toHaveURL(/.*checkout-step-two.html/);

  //finalizar compra
  await page.click('#finish');

  //validar mensagem de compra com sucesso
  const mensagem = page.locator('.complete-header');
  await expect(mensagem).toHaveText('Thank you for your order!');
});
