describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads the homepage successfully", () => {
    cy.url().should("include", "/");
    cy.get("body").should("be.visible");
  });

  it("displays the hero section with correct title", () => {
    cy.get(".hero-section").should("be.visible");
    cy.get(".hero-section ");
  });

  it("displays the sports news section", () => {
    cy.get(".sports-news-section").should("be.visible");
    cy.get(".sports-news-section .section-title").should(
      "contain",
      "Latest Sports News"
    );
  });

  it("displays the featured slider section", () => {
    cy.get(".news-slider-section").should("be.visible");
    cy.get(".news-slider-section .section-title").should(
      "contain",
      "Featured News"
    );
  });

  it("switches language when clicking language switcher", () => {
    cy.get('.language-switcher a[href*="/tr"]').should("exist");
    cy.get(".language-switcher a.active").should("contain", "English");

    cy.get('.language-switcher a[href*="/tr"]').click();

    cy.url().should("include", "/tr");

    cy.get(".language-switcher a.active").should("contain", "Türkçe");

    cy.get(".sports-news-section .section-title").should(
      "contain",
      "En Son Spor Haberleri"
    );
  });
});
