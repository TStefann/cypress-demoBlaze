import { HomePage } from "../pages/homepage.page";

Cypress.Commands.add("login", (username, password) => {
  cy.visit("/");
  HomePage.openLogInModal();
  HomePage.logIn(username, password);
  cy.get(HomePage.selectors.nameOfUser)
    .should("be.visible")
    .and("have.text", `Welcome ${username}`);
});
