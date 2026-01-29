describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the header with logo', () => {
    cy.contains('GameBoy').should('be.visible');
  });

  it('should navigate to all main pages', () => {
    // Check home page
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    
    // Navigate to Search
    cy.contains('Search').click();
    cy.url().should('include', '/search');
    
    // Navigate to Insights
    cy.contains('Insights').click();
    cy.url().should('include', '/insights');
    
    // Navigate to Favorites
    cy.contains('Favorites').click();
    cy.url().should('include', '/favorites');
    
    // Navigate back to Discover
    cy.contains('Discover').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should highlight active navigation item', () => {
    // On home page
    cy.contains('button', 'Discover').should('have.class', 'bg-primary');
    
    // Navigate to Search
    cy.contains('Search').click();
    cy.contains('button', 'Search').should('have.class', 'bg-primary');
  });

  it('should have working logo link', () => {
    cy.contains('Search').click();
    cy.url().should('include', '/search');
    
    cy.contains('GameBoy').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
