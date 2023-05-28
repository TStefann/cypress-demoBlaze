export class CartPage {
  static selectors = {
    addCartBtn: '[onclick="addToCart(1)"]',
    placeOrderBtn: `[data-target="#orderModal"]`,
    nameInput: "#name",
    countryInput: "#country",
    cityInput: "#city",
    creditCardInput: "#card",
    montInpunt: "#month",
    yearInput: "#year",
    purchaseBtn: `[onclick="purchaseOrder()"]`,
    confirmationCheck: ".sa-success",
    confirmationMessage: ".sweet-alert > h2",
  };

  static addToCart = () =>
    cy.get(this.selectors.addCartBtn).should("be.visible").click();

  static placeOrder = () =>
    cy.get(this.selectors.placeOrderBtn).should("be.visible").click();

  static completeForm = (
    name: string,
    country: string,
    city: string,
    creditCard: string,
    month: any,
    year: any
  ) => {
    cy
      .get(this.selectors.nameInput)
      .should("be.visible")
      .click()
      .clear()
      .type(name)
      .should("have.value", name),
      cy
        .get(this.selectors.countryInput)
        .should("be.visible")
        .click()
        .clear()
        .type(country)
        .should("have.value", country),
      cy
        .get(this.selectors.cityInput)
        .should("be.visible")
        .click()
        .clear()
        .type(city)
        .should("have.value", city),
      cy
        .get(this.selectors.creditCardInput)
        .should("be.visible")
        .click()
        .clear()
        .type(creditCard)
        .should("have.value", creditCard),
      cy
        .get(this.selectors.montInpunt)
        .should("be.visible")
        .click()
        .clear()
        .type(month)
        .should("have.value", month),
      cy
        .get(this.selectors.yearInput)
        .should("be.visible")
        .click()
        .clear()
        .type(year)
        .should("have.value", year),
      cy.get(this.selectors.purchaseBtn).should("be.visible").click();
  };

  static confirmationOrder = () => {
    cy.get(this.selectors.confirmationCheck).should("be.visible");
    cy.get(this.selectors.confirmationMessage)
      .should("be.visible")
      .and("have.text", "Thank you for your purchase!");
  };
}
