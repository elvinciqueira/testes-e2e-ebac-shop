export default class CheckoutScreenPageObject {
  constructor(cy) {
    this.cy = cy;
  }

  fillBillingForm({
    firstName,
    lastName,
    company,
    country,
    address1,
    address2,
    city,
    phone,
    postCode,
    state,
    email,
  }) {
    this.cy.get('input[name="billing_first_name"]').clear().type(firstName);
    this.cy.get('input[name="billing_last_name"]').clear().type(lastName);
    this.cy.get('input[name="billing_company"]').clear().type(company);
    this.cy
      .get('#select2-billing_country-container')
      .click()
      .type(country)
      .get('[aria-selected="true"]')
      .click();
    this.cy.get('input[name="billing_address_1"]').clear().type(address1);
    this.cy.get('input[name="billing_address_2"]').clear().type(address2);
    this.cy.get('input[name="billing_city"]').clear().type(city);
    this.cy
      .get('#select2-billing_state-container')
      .click()
      .type(`${state}{enter}`);
    this.cy.get('input[name="billing_postcode"]').clear().type(postCode);
    this.cy.get('input[name="billing_phone"]').clear().type(phone);
    this.cy.get('input[name="billing_email"]').clear().type(email);
    return this;
  }

  choosePaymentMethod(paymentMethod) {
    this.cy.get(`#payment_method_${paymentMethod}`);
    return this;
  }

  checkAgreementTerm() {
    this.cy.get('#terms').check();
    return this;
  }

  purchaseItems() {
    this.cy.get('input[data-value="Finalizar compra"]').click();
    return this;
  }
}
