describe('Game Details Page', () => {
  beforeEach(() => {
    // Visit a game details page (using game ID 1, which has mock data)
    cy.visit('/game/1');
  });

  // --- Core Content & Header Tests ---

  it('should display game title and info', () => {
    // Check for the main title from mock data
    cy.get('h1').contains('Call of Duty: Warzone').should('be.visible'); 
    cy.contains('Live').should('be.visible'); // Status badge
    cy.contains('4.5').should('be.visible'); // Rating
  });

  it('should display the main game thumbnail/cover image', () => {
    cy.get('img[alt="Call of Duty: Warzone"]').first().should('be.visible');
  });

  it('should display back button', () => {
    cy.contains('button', 'Back').should('be.visible');
  });


  // --- Screenshot Gallery Tests ---

  it('should display screenshot gallery', () => {
    // Check for multiple images in the gallery/thumbnails section
    cy.get('img').should('have.length.greaterThan', 1);
  });

  it('should switch between screenshot thumbnails and highlight the active one', () => {
    // Click the second thumbnail button
    cy.get('button').filter(':has(img)').eq(1).click();
    
    // Verify the thumbnail is highlighted (assuming a 'border-primary' class)
    cy.get('button').filter(':has(img)').eq(1).should('have.class', 'border-primary');

    // Click the first thumbnail button
    cy.get('button').filter(':has(img)').eq(0).click();

    // Verify the first one is now highlighted and the second one is not
    cy.get('button').filter(':has(img)').eq(0).should('have.class', 'border-primary');
    cy.get('button').filter(':has(img)').eq(1).should('not.have.class', 'border-primary');
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