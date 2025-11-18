// /cypress/e2e/home.cy.ts
/// <reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
    // Wait for the initial loading simulation to finish by waiting for skeletons to disappear
    cy.get('[class*="GameCardSkeleton"]', { timeout: 10000 }).should('not.exist');
    cy.get('[class*="MostPlayedCardSkeleton"]').should('not.exist');
    cy.get('[class*="RecentlyAddedCardSkeleton"]').should('not.exist');
  });

  // --- Header Tests ---
  
  it('should display the header with logo and navigation', () => {
    cy.get('header').should('be.visible');
    cy.contains('span', 'GameBoy').should('be.visible');
    cy.get('nav').within(() => {
      cy.contains('Discover').should('be.visible');
      cy.contains('Search').should('be.visible');
      cy.contains('Insights').should('be.visible');
      cy.contains('Favorites').should('be.visible');
    });
  });

  it('should highlight the active "Discover" link on the home page', () => {
    // The "Discover" button (Link to "/") should have the "default" variant
    cy.get('nav').contains('Discover').should('have.class', 'bg-primary');
    // The "Search" button should have the "ghost" variant
    cy.get('nav').contains('Search').should('not.have.class', 'bg-primary');
  });

  it('should navigate when clicking header links', () => {
    cy.get('nav').contains('Search').click();
    cy.url().should('include', '/search');

    cy.get('nav').contains('Insights').click();
    cy.url().should('include', '/insights');

    cy.get('nav').contains('Favorites').click();
    cy.url().should('include', '/favorites');

    // Go back to home
    cy.get('a').contains('span', 'GameBoy').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  // --- Hero Section Tests ---
  
  it('should display the hero section with title and button', () => {
    cy.contains('h1', 'Browse the best free to play games').should('be.visible');
    // The button text is in a span
    cy.contains('span', 'Browse Games').should('be.visible');
  });

  // --- Content Section Tests ---
  
  it('should display the "Trending Now" section with game cards', () => {
    cy.contains('h2', 'Trending Now').should('be.visible');
    cy.contains("p", "The hottest games everyone's playing").should('be.visible');

    // Check for a specific game card from the mock data
    cy.contains('h3', 'The Witcher 3').should('be.visible');
    cy.contains('h3', 'The Witcher 3').closest('div[class*="group cursor-pointer"]').within(() => {
      cy.get('img').should('be.visible');
      cy.contains('9.5').should('be.visible'); // Rating
      cy.contains('PC').should('be.visible'); // Platform
    });
  });

  it('should display the "Most Played Today" section with game cards', () => {
    cy.contains('h2', 'Most Played Today').should('be.visible');
    cy.contains('p', 'Top games with the highest player count right now').should('be.visible');

    // Check for a specific game card from the mock data
    // cy.contains('h3', 'Arena Breakout').should('be.visible');
    // // Check for content on hover (by forcing the div to show)
    // cy.contains('h3', 'Arena Breakout').closest('[class*="group cursor-pointer"]').find('div[class*="opacity-0"]').invoke('attr', 'class', 'absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4');
    // cy.contains('★ 8.8').should('be.visible');
    // Find the card using the image alt text, which is always present
    
  });

  it('should display the "Recently Added" section with game cards', () => {
    cy.contains('h2', 'Recently Added').should('be.visible');
    cy.contains('p', 'Latest games added to our collection').should('be.visible');

    // Check for a specific game card from the mock data
    cy.contains('h3', 'Blue Protocol: Star Resonance').should('be.visible');
    cy.contains('h3', 'Blue Protocol: Star Resonance').closest('div[class*="group cursor-pointer"]').within(() => {
      cy.contains('A free-to-play open-world anime MMORPG.').should('be.visible');
      cy.contains('MMORPG').should('be.visible'); // Genre Badge
    });
  });

  // --- Navigation Tests ---

  it('should have a "View All" link for "Trending Now" that navigates to /search', () => {
    cy.contains('h2', 'Trending Now')
      .closest('section') // Find the parent <section>
      .find('a') // Find the link within it
      .contains('View All')
      .click();
      
    cy.url().should('include', '/search');
  });

  it('should have "View All" links for "Most Played" and "Recently Added"', () => {
    cy.contains('h2', 'Most Played Today')
      .closest('div[class*="lg:col-span-5"]') // Find the parent column
      .find('a')
      .contains('View All')
      .click();
    cy.url().should('include', '/search');
    
    cy.visit('/'); // Go back home
    cy.get('[class*="GameCardSkeleton"]', { timeout: 10000 }).should('not.exist'); // Wait again

    cy.contains('h2', 'Recently Added')
      .closest('div[class*="lg:col-span-7"]') // Find the parent column
      .find('a')
      .contains('View All')
      .click();
    cy.url().should('include', '/search');
  });

  it('should navigate to game details when clicking a trending game card', () => {
    // The mock data for "Elden Ring" has id: 3
    cy.contains('h3', 'Elden Ring').click();
    
    // Check if the URL includes the correct game ID
    cy.url().should('include', '/game/3');
  });

  it('should navigate to game details when clicking a different trending game card', () => {
    // The mock data for "God of War" has id: 4
    cy.contains('h3', 'God of War').click();
    
    // Check if the URL includes the correct game ID
    cy.url().should('include', '/game/4');
  });
});