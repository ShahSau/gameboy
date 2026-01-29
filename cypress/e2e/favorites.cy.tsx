// /cypress/e2e/favorites.cy.ts

describe("Favorites Page", () => {
  describe("Empty State", () => {
    beforeEach(() => {
      // 1. Clear storage to ensure no data exists
      cy.clearAllSessionStorage();
      cy.visit("/favorites");

      // 2. Wait for loading to finish
      cy.get('[class*="GameCardSkeleton"]', { timeout: 10000 }).should(
        "not.exist",
      );
    });

    it("should display the empty state message and icon", () => {
      cy.contains("h3", "No favorites yet").should("be.visible");
      cy.contains(
        "p",
        "Start exploring and add games to your collection!",
      ).should("be.visible");
      // Check for the large muted heart icon (opacity-20 is a good distinctive class to check)
      cy.get(".opacity-20").should("be.visible");
    });

    it('should navigate to search page when clicking "Browse Games"', () => {
      cy.contains("button", "Browse Games").click();
      cy.url().should("include", "/search");
    });
  });
  describe("Populated State", () => {
    beforeEach(() => {
      cy.visit("/favorites");
      // Wait for the simulated loading to finish by checking for skeletons to disappear
      cy.get('[class*="GameCardSkeleton"]', { timeout: 10000 }).should(
        "not.exist",
      );
    });

    // --- Header & Navigation Tests ---

    it('should display the header and highlight the "Favorites" link', () => {
      cy.get("header").should("be.visible");
      // The "Favorites" button should have the "default" variant (bg-primary)
      cy.get("nav").contains("Favorites").should("have.class", "bg-primary");
      // Other links should not be highlighted
      cy.get("nav").contains("Discover").should("not.have.class", "bg-primary");
    });

    // --- Main Content Tests ---

    it("should display the main title and subtitle", () => {
      cy.contains("h1", "Your Favorites").should("be.visible");
      cy.contains("p", "Games you've bookmarked for later").should(
        "be.visible",
      );
    });
  });
});
