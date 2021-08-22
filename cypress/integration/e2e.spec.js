/// <reference types="cypress" />
import HomeScreenPageObject from '../support/page_objects/HomeScreenPageObject';
import ProductScreenPageObject from '../support/page_objects/ProductScreenPageObject';
import CheckoutScreenPageObject from '../support/page_objects/CheckoutScreenPageObject';

const billingData = require('../fixtures/billing.json');

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente
        Quero acessar a Loja EBAC
        Para fazer um pedido de 4 produtos
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
    const homeScreen = new HomeScreenPageObject(cy);
    const productScreen = new ProductScreenPageObject(cy);
    const checkoutScreen = new CheckoutScreenPageObject(cy);

    homeScreen.seeProducts();

    cy.fixture('produtos').then((data) => {
      data.produtos.forEach((produto, index, self) => {
        const isLastItem = self.length - 1 === index;

        productScreen
          .chooseProduct(produto.nome)
          .selectSize(produto.tamanho)
          .selectColor(produto.cor)
          .addQuantity(produto.quantidade)
          .addToCart();

        isLastItem
          ? productScreen.seeCart().goToCheckout()
          : productScreen.backToProducts();
      });
    });

    checkoutScreen
      .fillBillingForm(billingData)
      .choosePaymentMethod(billingData.paymentMethod)
      .checkAgreementTerm()
      .purchaseItems();

    cy.get('.woocommerce-notice').should(
      'contain',
      'Obrigado. Seu pedido foi recebido.'
    );
    cy.get('.woocommerce-order-overview').should('be.visible');
    cy.get('.woocommerce-order-details').should('be.visible');
  });
});
