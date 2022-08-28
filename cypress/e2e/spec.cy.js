/* eslint-disable no-undef */
describe("spec", () => {
  it("visit website", () => {
    cy.visit("http://localhost:8080/");
  });
  it("closes the initial modal", () => {
    cy.get("#initial-modal-button").click();
  });
  it("check input", () => {
    cy.get("input").should("be.enabled");
  });
  it("check card visibility", () => {
    cy.get("#country-card").should("be.visible");
  });
  it("check input search for Portugal", () => {
    cy.get("input").should("be.enabled").type("Portugal");
  });
  it("goes to Portugal details page", () => {
    cy.get("#country-card-button").click();
    cy.get("h1").should("have.text", " Portugal ");
  });

  it("goes to border (spain)", () => {
    cy.get("#border-button").click();
    cy.get("h1").should("have.text", " Spain ");
  });
});
