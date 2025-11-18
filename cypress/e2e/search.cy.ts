describe('Search Page', () => {
  beforeEach(() => {
    // Visit the search page before each test
    cy.visit('/search');
    // Wait for initial games to load (based on mock data)
    cy.wait(500); 
    cy.get('.grid div[class*="group cursor-pointer"]').should('have.length.greaterThan', 0);
  });

  it('should display search bar and all filter sections', () => {
    cy.get('input[placeholder="Search for games..."]').should('be.visible');
    cy.contains('Category').should('be.visible');
    cy.contains('Platform').should('be.visible');
    cy.contains('Tags').should('be.visible');
    cy.contains('Sort By').should('be.visible');
  });

  it('should search for games by title and filter the list', () => {
    // Check that a game that will be filtered out is visible first
    cy.contains('The Witcher 3').should('be.visible');
    
    cy.get('input[placeholder="Search for games..."]').type('Valorant');
    cy.wait(200); // Wait for client-side filtering

    // Assert the correct game is shown
    cy.contains('Valorant').should('be.visible');
    // Assert the other game is no longer visible
    cy.contains('The Witcher 3').should('not.exist');
  });

  it('should clear the search input using the "X" button', () => {
    cy.get('input[placeholder="Search for games..."]').type('Test Query');
    cy.get('input[placeholder="Search for games..."]').should('have.value', 'Test Query');
    
    cy.get('button[aria-label="Clear search"]').click();
    
    cy.get('input[placeholder="Search for games..."]').should('have.value', '');
  });

  it('should filter by category and show active filter state', () => {
    cy.contains('Category').parent().find('button').click();
    cy.get('div[role="listbox"]').contains('Action').click();
    
    // Assert the select value changed
    cy.contains('Category').parent().find('button').should('contain', 'Action');
    // Assert the "Clear Filters" button appears
    cy.contains('Clear Filters').should('be.visible');
    // Assert the header text changes
    cy.contains('Found').should('be.visible');
  });

  it('should filter by platform and show active filter state', () => {
    cy.contains('Platform').parent().find('button').click();
    cy.get('div[role="listbox"]').contains('PC').click();
    
    // Assert the select value changed
    cy.contains('Platform').parent().find('button').should('contain', 'PC');
    // Assert the "Clear Filters" button appears
    cy.contains('Clear Filters').should('be.visible');
  });

  it('should filter by tags and show active filter state', () => {
    cy.contains('Multiplayer').click();
    
    // Assert the "Clear Filters" button appears
    cy.contains('Clear Filters').should('be.visible');
    cy.contains('Found').should('be.visible');

    // Add another tag
    cy.contains('PvP').click();
    cy.contains('Clear Filters').should('be.visible'); // Should still be visible
  });

  it('should toggle a tag off and remove active filter state', () => {
    // Ensure no filters are active
    cy.contains('Clear Filters').should('not.exist');
    
    // Toggle tag on
    cy.contains('Multiplayer').click();
    cy.contains('Clear Filters').should('be.visible');

    // Toggle tag off
    cy.contains('Multiplayer').click();
    cy.contains('Clear Filters').should('not.exist');
  });

  it('should sort games and show active filter state', () => {
    cy.contains('Sort By').parent().find('button').click();
    cy.get('div[role="listbox"]').contains('Alphabetical').click();
    
    // Verify sorting select changed
    cy.contains('Sort By').parent().find('button').should('contain', 'Alphabetical');
    // Assert the "Clear Filters" button appears
    cy.contains('Clear Filters').should('be.visible');
  });

  it('should clear all filters when "Clear Filters" is clicked', () => {
    // Apply multiple filters
    cy.contains('Category').parent().find('button').click();
    cy.get('div[role="listbox"]').contains('Action').click();
    cy.contains('Multiplayer').click();
    cy.contains('Sort By').parent().find('button').click();
    cy.get('div[role="listbox"]').contains('Alphabetical').click();

    // Also type in search bar
    cy.get('input[placeholder="Search for games..."]').type('Game');

    // Verify filters are active
    cy.contains('Clear Filters').should('be.visible');

    // Clear all
    cy.contains('Clear Filters').click();

    // Verify filters are reset
    cy.contains('Clear Filters').should('not.exist');
    cy.contains('Category').parent().find('button').should('not.contain', 'Action');
    cy.contains('Sort By').parent().find('button').should('contain', 'Popularity');
    
    // Note: The search query is NOT cleared by "Clear Filters" based on the implementation
    cy.get('input[placeholder="Search for games..."]').should('have.value', 'Game');
  });

  it('should display a message when no games match the criteria', () => {
    cy.get('input[placeholder="Search for games..."]').type('NonExistentGame123456789');
    cy.contains('No games found matching your criteria').should('be.visible');
  });

  it('should display game cards', () => {
    cy.get('.grid').find('div[class*="group cursor-pointer"]').should('have.length.greaterThan', 0);
  });

  it('should load more games on scroll when no filters are active', () => {
    cy.get('.grid div[class*="group cursor-pointer"]').its('length').then((initialCount) => {
      cy.scrollTo('bottom');
      cy.wait(1000); // Wait for loading
      cy.get('.grid div[class*="group cursor-pointer"]').should('have.length.greaterThan', initialCount);
    });
  });

  it('should navigate to game details when clicking a card', () => {
    cy.get('.grid div[class*="group cursor-pointer"]').first().click();
    cy.url().should('include', '/game/');
  });
});