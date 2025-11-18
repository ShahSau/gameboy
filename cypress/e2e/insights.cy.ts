// /cypress/e2e/insights.cy.ts

describe('Insights Page', () => {
  beforeEach(() => {
    cy.visit('/insights');
  });

  it('should display the insights header', () => {
    cy.contains('Game Insights').should('be.visible');
    cy.contains('Dashboard showing genre/platform analytics').should('be.visible');
  });

  it('should show drag to reorder hint', () => {
    cy.contains('Drag to reorder sections').should('be.visible');
  });

  it('should display stats overview cards', () => {
    cy.contains('Total Games').should('be.visible');
    cy.contains('Active Players').should('be.visible');
    cy.contains('New Releases').should('be.visible');
    cy.contains('Top Rated').should('be.visible');
  });

  it('should display genre performance section', () => {
    cy.contains('Genre Performance').should('be.visible');
    cy.contains('Game distribution and player engagement by genre').should('be.visible');
  });

  it('should display games by tag chart', () => {
    cy.contains('Games by Tag').should('be.visible');
    cy.contains('Distribution of games across different tags').should('be.visible');
  });

  it('should display games by platform chart', () => {
    cy.contains('Games by Platform').should('be.visible');
    cy.contains('Number of games available on each platform').should('be.visible');
  });

  it('should display releases per year chart', () => {
    cy.contains('Releases per Year').should('be.visible');
    cy.contains('Game release trends over the years').should('be.visible');
  });

  it('should have tabs for platform analytics and top games', () => {
    cy.contains('button', 'Platform Analytics').should('be.visible');
    cy.contains('button', 'Top Games').should('be.visible');
  });

  it('should switch between tabs', () => {
    // Check Platform Analytics tab
    cy.contains('button', 'Platform Analytics').click();
    // Check for a card title, not just 'PC' which might be in a chart
    cy.contains('h3', 'PC').should('be.visible');
    cy.contains('h3', 'PlayStation').should('be.visible');
    
    // Switch to Top Games tab
    cy.contains('button', 'Top Games').click();
    cy.contains('Top Performing Games').should('be.visible');
    cy.contains('Valorant').should('be.visible');
  });

  it('should display charts with data', () => {
    // Check if recharts SVG elements are rendered
    cy.get('svg.recharts-surface').should('have.length.greaterThan', 0);
  });

  // --- New Tests Added ---

  it('should display the main header', () => {
    cy.get('header').should('be.visible');
    cy.get('header').contains('span', 'GameBoy').should('be.visible');
  });

  it('should display correct content in stats cards', () => {
    cy.contains('div', 'Total Games')
      .siblings()
      .contains('1,247') // Value
      .should('be.visible');
      
    cy.contains('div', 'Active Players')
      .siblings()
      .contains('9.4M') // Value
      .should('be.visible');
  });
  

  it('should display specific genre data in "Genre Performance"', () => {
    cy.contains('span', 'Shooter')
      .closest('div[class*="flex items-center justify-between"]')
      .within(() => {
        cy.contains('156 games').should('be.visible');
        cy.contains('2.4M').should('be.visible');
        cy.contains('+12%').should('be.visible');
      });
      
    cy.contains('span', 'RPG')
      .closest('div[class*="flex items-center justify-between"]')
      .within(() => {
        cy.contains('142 games').should('be.visible');
        cy.contains('2.1M').should('be.visible');
        cy.contains('+8%').should('be.visible');
      });
  });

  it('should display detailed platform analytics in its tab', () => {
    cy.contains('button', 'Platform Analytics').click();
    
    cy.contains('h3', 'PC')
      .closest('div[class*="p-6"]')
      .within(() => {
        cy.contains('span', 'Games').siblings().contains('421').should('be.visible');
        cy.contains('span', 'Players').siblings().contains('4.2M').should('be.visible');
        cy.contains('span', 'Market Share').siblings().contains('45%').should('be.visible');
      });
  });

  it('should display detailed top games data in its tab', () => {
    cy.contains('button', 'Top Games').click();
    
    cy.contains('h4', 'Valorant')
      .closest('div[class*="flex items-center justify-between"]')
      .within(() => {
        cy.contains('1').should('be.visible'); // Rank
        cy.contains('Shooter').should('be.visible'); // Genre
        cy.contains('845K').should('be.visible'); // Players
        cy.contains('9.2').should('be.visible'); // Rating
      });

    cy.contains('h4', 'Elden Ring')
      .closest('div[class*="flex items-center justify-between"]')
      .within(() => {
        cy.contains('5').should('be.visible'); // Rank
        cy.contains('RPG').should('be.visible'); // Genre
        cy.contains('543K').should('be.visible'); // Players
        cy.contains('9.5').should('be.visible'); // Rating
      });
  });

});