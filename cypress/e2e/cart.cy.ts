import { fa, faker } from "@faker-js/faker";
import { user } from "../fixtures/users";
import { CartPage } from "../pages/cartpage";
import { HomePage } from "../pages/homepage.page";

describe("Buy a product", () => {
  beforeEach(() => {
    cy.visit("/");
    HomePage.openLogInModal();
    HomePage.logIn(user.username, user.password);
    cy.get(HomePage.selectors.nameOfUser)
      .should("be.visible")
      .and("have.text", `Welcome ${user.username}`);
  });

  it("Buy a product", () => {
    HomePage.goToCategory("monitor");
    HomePage.buyFirstProductFromPage();
    CartPage.addToCart();

    cy.on("window:alert", str => {
      expect(str).contain("Product added.");
    });

    HomePage.goToCartPage();
    CartPage.placeOrder();

    //Test data
    const name = faker.person.firstName();
    const country = faker.location.country();
    const city = faker.location.city();
    const creditCard = faker.finance.accountNumber();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    CartPage.completeForm(name, country, city, creditCard, month, year);
    CartPage.confirmationOrder();
  });
});
