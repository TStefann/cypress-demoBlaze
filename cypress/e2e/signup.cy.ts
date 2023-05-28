import { HomePage } from "../pages/homepage.page";
import { faker } from "@faker-js/faker";

describe("Sign in a new user", () => {
  let randomUserName;
  let randomPassword;
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("POST", "/signup").as("signUp");

    randomUserName = faker.internet.userName();
    randomPassword = faker.internet.password();
  });

  it("Signup new user successful", () => {
    HomePage.openSignUpModal();
    HomePage.typeUserName(randomUserName);
    HomePage.typePassword(randomPassword);
    HomePage.submitSignUp();
    cy.wait("@signUp").its("response.statusCode").should("eq", 200);

    cy.on("window:alert", str => {
      expect(str).contain("Sign up successful.");
    });
  });

  it("Signup existing user", () => {
    HomePage.openSignUpModal();
    HomePage.typeUserName(randomUserName);
    HomePage.typePassword(randomPassword);
    HomePage.submitSignUp();
    cy.reload();

    HomePage.openSignUpModal();
    HomePage.typeUserName(randomUserName);
    HomePage.typePassword(randomPassword);
    HomePage.submitSignUp();
    cy.on("window:alert", str => {
      expect(str).contain("This user already exist.");
    });
  });
});
