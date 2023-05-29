export class HomePage {
  static selectors = {
    signUpBtn: "#signin2",
    usernameInput: "#sign-username",
    passwordInput: "#sign-password",
    submitLogin: 'button[onclick="register()"]',
    loginModal: "#login2",
    loginBtn: 'button[onclick="logIn()"]',
    loginUsername: "#loginusername",
    loginpassword: "#loginpassword",
    nameOfUser: "#nameofuser",
    monitorsCatergory: (category: string) => `[onclick="byCat('${category}')"]`,
    products: "[class='hrefch']",
    cartPage: "#cartur",
    productBlock: ".card-block",
  };

  static openSignUpModal = () =>
    cy.get(this.selectors.signUpBtn).should("be.visible").click();

  static typeUserName = (userName: string) =>
    cy
      .get(this.selectors.usernameInput)
      .should("be.visible")
      .click()
      .clear()
      .type(userName)
      .should("have.value", userName);

  static typePassword = (password: string) =>
    cy
      .get(this.selectors.passwordInput)
      .should("be.visible")
      .click()
      .clear()
      .type(password);

  static submitSignUp = () =>
    cy.get(this.selectors.submitLogin).should("be.visible").click();

  static openLogInModal = () =>
    cy.get(this.selectors.loginModal).should("be.visible").click();

  static logIn = (userName: string, password: string) => {
    cy
      .get(this.selectors.loginUsername)
      .should("be.visible")
      .click()
      .clear()
      .type(userName)
      .should("have.value", userName),
      cy
        .get(this.selectors.loginpassword)
        .should("be.visible")
        .click()
        .clear()
        .type(password)
        .should("have.value", password),
      cy.get(this.selectors.loginBtn).should("be.visible").click();
  };

  static goToCategory = (category: string) =>
    cy
      .get(this.selectors.monitorsCatergory(category))
      .should("be.visible")
      .click();

  static buyFirstProductFromPage = () =>
    cy.get(HomePage.selectors.products).first().should("be.visible").click();

  static goToCartPage = () =>
    cy.get(this.selectors.cartPage).should("be.visible").click();

  static pricesAreDisplayedForEachProduct = () => {
    cy.get(this.selectors.productBlock)
      .find("h5")
      .each($el => {
        const price = $el.text();
        expect(price).to.match(/^\$\d+/); //Regex that checks the price starts with '$' and is followed by digits
      });
  };
}
