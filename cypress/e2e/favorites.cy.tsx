// /cypress/e2e/favorites.cy.ts

describe('Favorites Page', () => {
  beforeEach(() => {
    cy.visit('/favorites');
    // Wait for the simulated loading to finish by checking for skeletons to disappear
    cy.get('[class*="GameCardSkeleton"]', { timeout: 10000 }).should('not.exist');
  });

  // --- Header & Navigation Tests ---

  it('should display the header and highlight the "Favorites" link', () => {
    cy.get('header').should('be.visible');
    // The "Favorites" button should have the "default" variant (bg-primary)
    cy.get('nav').contains('Favorites').should('have.class', 'bg-primary');
    // Other links should not be highlighted
    cy.get('nav').contains('Discover').should('not.have.class', 'bg-primary');
  });

  // --- Main Content Tests ---

  it('should display the main title and subtitle', () => {
    cy.contains('h1', 'Your Favorites').should('be.visible');
    cy.contains('p', "Games you've bookmarked for later").should('be.visible');
  });



  // --- Empty State Test (Conditional) ---

  // NOTE: This test will fail if the mock data in Favorites.tsx is NOT empty.
  // It is included here to show how to test the empty state if the component's state were controllable (e.g., via mocking).
  it.skip('should display the empty state when no games are favorited', () => {
    // This test requires mocking the state to return an empty array for 'favorites'
    
    // Check for empty state elements
    cy.contains('h3', 'No favorites yet').should('be.visible');
    cy.contains('p', 'Start exploring and add games to your collection!').should('be.visible');
    cy.get('svg[class*="lucide-heart"]').should('be.visible'); // Check for the central heart icon
    
    // Ensure no game cards are present
    cy.get('[class*="Card"]').should('not.exist');
  });
});