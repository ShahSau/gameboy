describe('Insights Page', () => {
  beforeEach(() => {
    // 1. Intercept the API call to force consistent test data
    cy.intercept('GET', '**/api/games*', { fixture: 'insights-games.json' }).as('getGames');

    // 2. Visit page
    cy.visit('/insights');

    // 3. Wait for data to load so animations complete and DOM is stable
    cy.wait('@getGames');
  });

  it('should display the insights header and descriptions', () => {
    cy.contains('Game Insights').should('be.visible');
    // Updated text matcher based on your new component
    cy.contains('Real-time analytics from our game library').should('be.visible');
  });

  it('should show drag to reorder hint', () => {
    // Updated text matcher
    cy.contains('Drag to reorder charts').should('be.visible');
  });

  it('should display stats overview cards with correct mocked data', () => {
    // Based on our fixture of 3 games
    cy.contains('div', 'Total Games')
      .siblings()
      .contains('3') // We provided 3 games in the JSON
      .should('be.visible');

    cy.contains('div', 'New Releases (2024)')
      .siblings()
      .contains('1') // Only 1 game in 2024 in our JSON
      .should('be.visible');
      
    // Check if other card labels exist
    cy.contains('Active Players (Est.)').should('be.visible');
    cy.contains('Avg Rating').should('be.visible');
  });

  it('should display "Genre Distribution" chart section', () => {
    cy.contains('Genre Distribution').should('be.visible');
    cy.contains('Top performing genres by game count').should('be.visible');

    // Verify the data from our fixture appears in the list
    // We had 1 Shooter, 1 RPG, 1 Strategy
    cy.contains('Shooter').should('be.visible');
    cy.contains('RPG').should('be.visible');
    
    // Check calculations (1 game / 3 total = 33%)
    cy.contains('Shooter')
      .closest('div[class*="space-y-2"]')
      .within(() => {
        cy.contains('1 games').should('be.visible');
        cy.contains('33%').should('be.visible');
      });
  });

  it('should display "Platform Availability" chart section', () => {
    // Updated Title
    cy.contains('Platform Availability').should('be.visible');
    cy.contains('Where players can find these games').should('be.visible');
    
    // Verify Recharts rendered the bars
    cy.get('.recharts-bar-rectangle').should('have.length.at.least', 1);
  });

  it('should display "Release History" chart section', () => {
    // Updated Title
    cy.contains('Release History (2010-2025)').should('be.visible');
    
    // Verify Recharts rendered the line
    cy.get('.recharts-line').should('exist');
  });

 it('should display "Top Rated Games" list at the bottom', () => {
    // 1. Scroll to the bottom card to trigger the Framer Motion 'whileInView' animation
    cy.contains('Top Rated Games (All Time)').scrollIntoView();

    // 2. Now check visibility (Cypress will retry this until the fade-in completes)
    cy.contains('Top Rated Games (All Time)').should('be.visible');
    cy.contains('Highest rated games based on community feedback').should('be.visible');

    // Verify our mock games are in the list
    cy.contains('Mock Shooter Game').should('be.visible');
    cy.contains('Mock RPG Game').should('be.visible');

    // Verify Genre badge is showing
    cy.contains('Mock Shooter Game')
      .closest('div[class*="group"]')
      .find('p')
      .contains('Shooter')
      .should('be.visible');
  });

  it('should navigate to game details when clicking a top rated game', () => {
    // Click on the first game from our mock
    cy.contains('Mock Shooter Game').click();

    // Verify URL change (id: 1 comes from the fixture)
    cy.url().should('include', '/game/1');
  });
});