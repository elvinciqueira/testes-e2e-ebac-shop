export default class ProductScreenPageObject {
  constructor(cy) {
    this.cy = cy;
  }

  chooseProduct(productName) {
    const urlResource = productName.toLowerCase().replace(/\s/g, '-');
    this.cy.get('[class="product-block grid"]').contains(productName).click();
    this.cy.url().should('include', `/product/${urlResource}/`);
    return this;
  }

  selectSize(size) {
    this.cy.get(`.button-variable-item-${size}`).click();
    return this;
  }

  selectColor(color) {
    this.cy.get(`.button-variable-item-${color}`).click();
    return this;
  }

  addQuantity(quantity) {
    this.cy.get('.input-text').clear().type(quantity);
    return this;
  }

  addToCart() {
    this.cy.get('.single_add_to_cart_button').click();
    return this;
  }

  backToProducts() {
    this.cy.get('#primary-menu > .menu-item-629 > a').click();
    return this;
  }

  seeCart() {
    this.cy.get('.woocommerce-message > .button').click();
    return this;
  }

  goToCheckout() {
    this.cy.get('.checkout-button').click();
    return this;
  }
}
