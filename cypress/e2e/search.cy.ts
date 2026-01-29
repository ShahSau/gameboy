describe('Search Page', () => {
  beforeEach(() => {
    // 1. Intercept the API call to force consistent test data
    cy.intercept('GET', '**/api/games*', { fixture: 'search-games.json' }).as('getGames');
    
    // 2. Visit the page
    cy.visit('/search');
    
    // 3. Wait for the API load
    cy.wait('@getGames');

    // 4. Wait for skeletons to disappear
    cy.get('[class*="GameCardSkeleton"]', { timeout: 10000 }).should('not.exist');
  });

  it('should display search bar and all filter sections', () => {
    cy.get('input[placeholder="Search by name..."]').should('be.visible');
    cy.contains('Category').should('be.visible');
    cy.contains('Platform').should('be.visible');
    cy.contains('Tags').should('be.visible');
    cy.contains('Sort By').should('be.visible');
  });

  it('should search for games by title (client-side)', () => {
    cy.contains('Alpha Shooter').should('be.visible');
    
    cy.get('input[placeholder="Search by name..."]').type('Beta');
    cy.wait(500); // Wait for debounce

    cy.contains('Beta RPG').should('be.visible');
    cy.contains('Alpha Shooter').should('not.exist');
  });

  it('should clear the search input using the "X" button', () => {
    cy.get('input[placeholder="Search by name..."]').type('Test Query');
    cy.get('input[placeholder="Search by name..."]').should('have.value', 'Test Query');
    
    cy.get('button[aria-label="Clear search"]').click();
    
    cy.get('input[placeholder="Search by name..."]').should('have.value', '');
  });

  it('should filter by Category (triggers API refetch)', () => {
    // Open Category Dropdown
    cy.contains('Category').parent().find('button').click();
    
    // FIX: Use matchCase: false because data is "shooter" but UI shows "Shooter"
    cy.get('div[role="listbox"]').contains('shooter', { matchCase: false }).click();
    
    // Wait for the refetch
    cy.wait('@getGames');
    
    // Verify the dropdown button text updated (matchCase false again just to be safe)
    cy.contains('Category').parent().find('button').should('contain.text', 'shooter');
    
    // Verify Clear Filters button appears
    cy.contains('Clear Filters').should('be.visible');
  });

  it('should filter by Platform (triggers API refetch)', () => {
    cy.contains('Platform').parent().find('button').click();
    cy.get('div[role="listbox"]').contains('Web Browser').click();
    
    cy.wait('@getGames');
    
    cy.contains('Platform').parent().find('button').should('contain', 'Web Browser');
  });

  it('should filter by Tags (client-side)', () => {
    // Open tags and select Shooter
    cy.contains('div', 'Tags').parent().contains('Shooter').click();

    // "Alpha Shooter" (Genre: Shooter) should be visible
    cy.contains('Alpha Shooter').should('be.visible');
    // "Beta RPG" (Genre: RPG) should be hidden
    cy.contains('Beta RPG').should('not.exist');

    // Toggle off
    cy.contains('div', 'Tags').parent().contains('Shooter').click();
    cy.contains('Beta RPG').should('be.visible');
  });

  it('should clear all filters and search when "Clear Filters" is clicked', () => {
    // 1. Apply Search
    cy.get('input[placeholder="Search by name..."]').type('Alpha');
    
    // 2. Apply Category (using matchCase fix)
    cy.contains('Category').parent().find('button').click();
    cy.get('div[role="listbox"]').contains('shooter', { matchCase: false }).click();

    // Verify filters active
    cy.contains('Clear Filters').should('be.visible');

    // 3. Click Clear
    cy.contains('Clear Filters').click();

    // 4. Assertions
    cy.contains('Clear Filters').should('not.exist');
    // Ensure dropdown text does NOT contain 'shooter' anymore
    cy.contains('Category').parent().find('button').should('not.contain', 'shooter');
    // Ensure search is cleared
    cy.get('input[placeholder="Search by name..."]').should('have.value', '');
  });

  it('should display "No games found" when search yields no results', () => {
    cy.get('input[placeholder="Search by name..."]').type('ImpossibleGameNameXYZ');
    cy.wait(500);
    cy.contains('No games found').should('be.visible');
  });

  it('should load more games on scroll (Infinite Scroll)', () => {
    cy.get('.grid div[class*="group cursor-pointer"]').should('have.length', 12);
    
    cy.scrollTo('bottom');
    cy.wait(1000); 

    cy.get('.grid div[class*="group cursor-pointer"]').should('have.length', 15);
    cy.contains("You've reached the end of the list!").should('be.visible');
  });

  it('should navigate to game details when clicking a card', () => {
    cy.contains('h3', 'Alpha Shooter').click();
    cy.url().should('include', '/game/1');
  });
});