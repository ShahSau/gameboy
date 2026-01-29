describe('Game Details Page', () => {
  beforeEach(() => {
    // 1. Intercept the API call the app makes
    // We use a wildcard (*) because the real API URL likely includes the ID
    cy.intercept('GET', '**/api/game?id=*', { fixture: 'game-details.json' }).as('getGameDetails');

    // 2. Visit the page (using the ID that matches our mock logic)
    cy.visit('/game/452');

    // 3. WAIT for the data to load before running any assertions
    // This fixes the "Timed out" error because Cypress pauses here until the mock data loads
    cy.wait('@getGameDetails');
  });

  // --- Core Content & Header Tests ---

  it('should display game title and info', () => {
    // Check for the main title from mock data
    cy.get('h1').contains('Call of Duty: Warzone').should('be.visible'); 
    cy.contains('Live').should('be.visible'); // Status badge
  });

  it('should display the main game thumbnail/cover image', () => {
    cy.get('img[alt="Call of Duty: Warzone"]').first().should('be.visible').and('have.attr', 'src', 'https://www.freetogame.com/g/452/warzone-1.jpg');
  });

  it('should switch between screenshot thumbnails and highlight the active one', () => {
    // 1. Locate the container grid specifically to scope our search
    // We look for the div that holds the grid of screenshots
    cy.get('.grid.grid-cols-4').within(() => {
      
      // 2. Find ALL buttons inside this grid
      // This ensures we get the inactive ones too, not just the active one
      cy.get('button').as('thumbnails');
      
      // 3. Assert we have multiple screenshots (from our fixture)
      cy.get('@thumbnails').should('have.length.gt', 1);

      // 4. Click the SECOND thumbnail (index 1)
      cy.get('@thumbnails').eq(1).click();

      // 5. Verify the SECOND thumbnail now has the active class (border-primary)
      cy.get('@thumbnails').eq(1).should('have.class', 'border-primary');

      // 6. Verify the FIRST thumbnail (index 0) is now inactive (border-transparent)
      cy.get('@thumbnails').eq(0).should('have.class', 'border-transparent');
    });
  });


  // --- Screenshot Gallery Tests ---

  it('should display screenshot gallery', () => {
    // Check for multiple images in the gallery/thumbnails section
    cy.get('img').should('have.length.greaterThan', 1);
  });


  // --- Game Info Tests ---
  
  it('should display game information and data', () => {
    // Check for labels
    cy.contains('Release Date').should('be.visible');
    cy.contains('Platform').should('be.visible');
    cy.contains('Developer').should('be.visible');
    cy.contains('Publisher').should('be.visible');

    // Check for data content from mock (Call of Duty: Warzone)
    cy.contains('Release Date').siblings().contains('2020-03-10').should('be.visible');
    cy.contains('Platform').siblings().contains('Windows').should('be.visible');
    cy.contains('Developer').siblings().contains('Infinity Ward').should('be.visible');
    cy.contains('Publisher').siblings().contains('Activision').should('be.visible');
    
    // Check for genre badge
    cy.contains('Shooter').should('be.visible');
  });

  it('should display action buttons', () => {
    cy.contains('button', 'Play Now').should('be.visible');
    cy.contains('button', 'Add to Favorites').should('be.visible');
  });
  
  // --- Trailer & About Tests ---

  it('should display game trailer section', () => {
    cy.contains('Game Trailer').should('be.visible');
  });
  


  it('should display about section', () => {
    cy.contains('About').should('be.visible');
    // Check for the existence of the description text
    cy.get('p').filter(':visible').should('have.length.greaterThan', 0);
  });

  // --- Requirements & Related Games Tests ---

  it('should display system requirements and data', () => {
    cy.contains('Minimum System Requirements').should('be.visible');
    cy.contains('OS').should('be.visible');
    cy.contains('Processor').should('be.visible');
    cy.contains('Memory').should('be.visible');
    cy.contains('Graphics').should('be.visible');
    cy.contains('Storage').should('be.visible');
    
    // Check for data content from mock
    cy.contains('OS').siblings().should('not.be.empty');
    cy.contains('Processor').siblings().should('not.be.empty');
    cy.contains('Memory').siblings().should('not.be.empty');
  });

  it('should display people also viewed section', () => {
    cy.contains('People Also Viewed').should('be.visible');
  });

});