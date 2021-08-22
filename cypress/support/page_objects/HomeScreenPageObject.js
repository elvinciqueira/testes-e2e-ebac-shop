export default class HomeScreenPageObject {
  constructor(cy) {
    this.cy = cy;
  }

  seeProducts() {
    this.cy.get('#primary-menu > .menu-item-629 > a').click();
    return this;
  }
}
