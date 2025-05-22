describe('Program Finder Navigation', () => {
  beforeEach(() => {
    // Reset state before each test
    cy.intercept('GET', '**/api/programs').as('programsApi');

    cy.visit('/', {
      timeout: 30000,
      retryOnStatusCodeFailure: true,
      failOnStatusCode: false
    });

    // Wait for initial API load
    cy.wait('@programsApi', { timeout: 10000 });
  });

  it('completes the program search flow', () => {
    // Verify page load
    cy.contains('h1', 'Find Local Programs Near You').should('be.visible');

    // Input and search
    cy.get('[data-cy="zip-input"]')
      .should('be.visible')
      .type('19801');

    cy.get('[data-cy="search-button"]')
      .should('be.visible')
      .click();

    // Filter interactions
    cy.get('.filter-toggle')
      .should('be.visible')
      .click();

    cy.get('.filters-header')
      .should('be.visible');

    // Clear recent searches
    cy.get('.clear-recent')
      .should('be.visible')
      .click();

    cy.get('.recent-searches-list')
      .should('not.exist');
  });
});