import { user } from "../fixtures/users";
import { HomePage } from "../pages/homepage.page";

describe("Categories", () => {
  beforeEach(() => {
    cy.login(user.username, user.password);
    cy.intercept("POST", "/bycat").as("bycat");
  });

  it("Browse to all the Categories and check that the price is displayed for each element", () => {
    HomePage.goToCategory("monitor");
    cy.wait("@bycat").its("response.statusCode").should("eq", 200);
    HomePage.pricesAreDisplayedForEachProduct();

    HomePage.goToCategory("phone");
    cy.wait("@bycat").its("response.statusCode").should("eq", 200);
    HomePage.pricesAreDisplayedForEachProduct();

    HomePage.goToCategory("notebook");
    cy.wait("@bycat").its("response.statusCode").should("eq", 200);
    HomePage.pricesAreDisplayedForEachProduct();
  });
});
