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

  it("Clicking name on list renders customer order and product detail field names", function() {
    cy.get("#names-list > :nth-child(1)")
      .contains("Atelier graphique")
      .click();
    cy.get(".orders-list").contains("Order Date:");
    cy.get(".orders-list").contains("Required Date:");
    cy.get(".orders-list").contains("Shipped Date:");
    cy.get(".orders-list").contains("Status:");
    cy.get(".orders-list").contains("Comments:");
    cy.get(".orders-list").contains("Customer Number:");

    cy.get(".products-list").contains("Product Name:");
    cy.get(".products-list").contains("Product Code:");
    cy.get(".products-list").contains("MSRP:");
    cy.get(".products-list").contains("Buy Price:");
    cy.get(".products-list").contains("Order Line Number:");
    cy.get(".products-list").contains("Price Each:");
    cy.get(".products-list").contains("Product Description:");
    cy.get(".products-list").contains("Product Line:");
    cy.get(".products-list").contains("Product Scale:");
    cy.get(".products-list").contains("Product Vendor:");
    cy.get(".products-list").contains("Quantity In Stock:");
    cy.get(".products-list").contains("Quantity Ordered:");
  });
});

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
