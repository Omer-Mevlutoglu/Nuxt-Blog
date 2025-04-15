describe("Trending Page", () => {
  beforeEach(() => {
    cy.visit("/trending");
  });

  it("should load the trending page successfully", () => {
    cy.url().should("include", "/trending");

    cy.get(".trending-page").should("exist");
    cy.get(".trending-page").should("be.visible");

    cy.get(".section-title").should("be.visible");
    cy.get(".section-title").should("contain", "Trending");
  });

  it("should fetch and display articles from the API", () => {
    cy.get(".articles-grid").should("exist");

    cy.get(".articles-grid article").should("have.length.at.least", 1);

    cy.get(".articles-grid article")
      .first()
      .within(() => {
        cy.get("h3").should("exist"); 
        cy.get(".card-link").should("exist"); 
        cy.get("img").should("exist"); 
      });
  });

  it("should navigate to article detail page when clicking read more", () => {
    cy.get(".articles-grid").should("exist");

    cy.get(".articles-grid article")
      .first()
      .within(() => {
        cy.get("h3").invoke("text").as("articleTitle");

        cy.get(".card-link").click();
      });

    cy.url().should("match", /\/trending\/\d+/);

    cy.get(".trending-detail").should("exist");
    cy.get(".post-header").should("be.visible");
  });
});
