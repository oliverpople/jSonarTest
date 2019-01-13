describe("Login test 1", function() {
  it("Visits the login page and types in details", function() {
    cy.visit("http://localhost:3000/");

    cy.get("#username-field")
      .type("Test1")
      .should("have.value", "Test1");

    cy.get("#password-field")
      .type("test1@mytest.com")
      .should("have.value", "test1@mytest.com");
  });
});

describe("Data Discovery Page renders", function() {
  it("Usr clicks the login button and the Data Discovery Page renders", function() {
    cy.get("#login-submit-button").click();
    cy.contains("Data Discovery Page");
    cy.get("#search-button").contains("submit");
  });
});

// describe("User can register th log in", function() {
//   it("Visit the login page", function() {
//     cy.visit("http://localhost:3000/");
//
//     cy.get("#username-field")
//       .type("Test1")
//       .should("have.value", "Test1");
//
//     cy.get("#password-field")
//       .type("test1@mytest.com")
//       .should("have.value", "test1@mytest.com");
//   });
//
// });
