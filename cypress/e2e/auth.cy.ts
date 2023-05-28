import { HomePage } from "../pages/homepage.page";
import { user } from "../fixtures/users";

describe("Authentication scenarios", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.intercept("POST", "/login").as("login");
  });

  it("Login success case", () => {
    HomePage.openLogInModal();
    HomePage.logIn(user.username, user.password);
    cy.wait("@login").its("response.statusCode").should("eq", 200);

    cy.get(HomePage.selectors.nameOfUser)
      .should("be.visible")
      .and("have.text", `Welcome ${user.username}`);
  });

  it("Login with wrong password", () => {
    HomePage.openLogInModal();
    HomePage.logIn(user.username, "wrong password");

    cy.on("window:alert", str => {
      expect(str).contain("Wrong password.");
    });
    cy.get(HomePage.selectors.nameOfUser).should("not.be.visible");
  });
});
