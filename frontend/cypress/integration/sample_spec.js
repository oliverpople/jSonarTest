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

  it("Names list renders", function() {
    cy.get("#names-list");
    cy.get(".MuiListItemText-root-48");
  });

  it("Search box filters list by name", function() {
    cy.get("#search-box")
      .type("Atelier graphique")
      .should("have.value", "Atelier graphique");
    cy.get("#search-button").click();
    cy.get("#names-list").contains("Atelier graphique");
  });
});

//
// find search box
// type in name
// hit submit button
// name appars in list
//
// find name in list
// click name
// orders appear
// - check all details criteria
// products appear
// - check all details criteria
//
// find submit button
// submit button says see list
//
// find see list button
// click interval
// generates list of names
//
// type in bad name
// hit submit
// name doesnt appars in list
//
// type in name with no order
// hit submit
// alert 'customer has no Orders'

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
