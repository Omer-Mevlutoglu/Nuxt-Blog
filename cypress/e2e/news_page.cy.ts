describe("News Page", () => {
  beforeEach(() => {
    cy.visit("/news");
    cy.get(".articles-list").should("exist");
  });

  it("loads the news page successfully", () => {
    cy.url().should("include", "/news");
    cy.get("body").should("be.visible");
  });

  it("displays the section title correctly", () => {
    cy.get(".section-title").should("be.visible");
    cy.get(".section-title").should("exist");
  });

  it("has functioning tag filter system", () => {
    cy.get(".tag-filter").should("exist");

    cy.get(".tag-filter button").should("have.length.at.least", 1);

    cy.get(".tag-filter button").first().click();

    cy.get(".tag-filter button.active").should("exist");

    cy.get(".articles-list").should("exist");
  });

  it("navigates to article detail page when clicking read more", () => {
    cy.get(".articles-list").should("exist");

    cy.get(".articles-list article h3")
      .first()
      .invoke("text")
      .then((listTitle) => {
        cy.get(".articles-list article").first().find(".card-link").click();

        cy.url().should("include", "/news/");

        cy.get(".article-page").should("exist");
        cy.get(".article-header").should("be.visible");

        cy.get(".article-header .title")
          .invoke("text")
          .should("equal", listTitle);
      });
  });
});
