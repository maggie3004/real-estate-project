describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the main hero section', () => {
    cy.get('h1').should('contain', 'Find Your Dream Home');
    cy.get('p').should('contain', 'Discover the perfect property');
  });

  it('should have working search functionality', () => {
    cy.get('[data-testid="search-location"]').type('Mumbai');
    cy.get('[data-testid="search-property-type"]').select('apartment');
    cy.get('[data-testid="search-price"]').type('5000000');
    cy.get('[data-testid="search-button"]').click();
    
    // Should navigate to listings page
    cy.url().should('include', '/listings');
  });

  it('should display featured properties', () => {
    cy.get('[data-testid="featured-properties"]').should('be.visible');
    cy.get('[data-testid="property-card"]').should('have.length.at.least', 1);
  });

  it('should allow adding properties to favorites', () => {
    cy.get('[data-testid="favorite-button"]').first().click();
    cy.get('[data-testid="favorite-button"]').first().should('have.class', 'favorited');
  });

  it('should have working navigation links', () => {
    cy.get('nav').contains('Properties').click();
    cy.url().should('include', '/listings');
    
    cy.visit('/');
    cy.get('nav').contains('Map View').click();
    cy.url().should('include', '/map');
  });

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-6');
    cy.get('[data-testid="mobile-menu-button"]').should('be.visible');
    cy.get('[data-testid="mobile-menu-button"]').click();
    cy.get('[data-testid="mobile-menu"]').should('be.visible');
  });

  it('should have accessible form elements', () => {
    cy.get('[data-testid="search-location"]').should('have.attr', 'aria-label');
    cy.get('[data-testid="search-button"]').should('have.attr', 'aria-label');
  });
}); 