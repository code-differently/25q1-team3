describe('User Flow Integration Tests', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('Hydration failed') || err.message.includes('error while hydrating')) {
        return false;
      }
    });
  });

  afterEach(() => {
    Cypress.on('uncaught:exception', () => {});
  });

  it('should perform a search, view program details, bookmark, and verify bookmark', () => {
    // Visit the homepage
    cy.visit('http://localhost:3000');
    cy.wait(3000);

    // Type into the ZIP code field and submit search
    cy.get('[data-cy="zip-input"]').type('19801');
    cy.get('[data-cy="search-button"]').click();

    // Wait for search results and click on the first program card
    cy.get('.program-card').first().click();

    // On the program details page, click the bookmark button
    cy.get('[data-cy="bookmark-button"]').click();

    // Navigate to the bookmarks page
    cy.get('[data-cy="nav-more"]').click();
    cy.get('[data-cy="nav-bookmarks"]').click();

    // Verify that the bookmarked program appears on the bookmarks page
    cy.get('.program-card').should('exist');
  });

  it('should test recent searches functionality', () => {
    // Visit the homepage
    cy.visit('http://localhost:3000');
    cy.wait(3000);

    // Perform a search to add a recent search
    cy.get('[data-cy="zip-input"]').type('19801');
    cy.get('[data-cy="search-button"]').click();

    // Verify that the recent search appears
    cy.get('.recent-searches-list').should('exist');
    cy.get('.recent-search-item').should('contain', '19801');

    // Click on a recent search to trigger a new search
    cy.get('.recent-search-item').first().click();

    // Verify that the search is performed again
    cy.get('[data-cy="zip-input"]').should('have.value', '19801');

    // Clear recent searches
    cy.get('.clear-recent').click();

    // Verify that the recent searches list is cleared
    cy.get('.recent-searches-list').should('not.exist');
  });

  it('should handle error and empty states', () => {
    // Visit the homepage
    cy.visit('http://localhost:3000');
    cy.wait(3000);

    // Simulate a search with no results
    cy.get('[data-cy="zip-input"]').type('99999');
    cy.get('[data-cy="search-button"]').click();

    // Verify that the "No programs found" message is displayed
    cy.contains('No programs found').should('be.visible');

    // Simulate a network error by intercepting the API call
    cy.intercept('GET', '**/api/programs', { statusCode: 500 }).as('apiError');
    cy.get('[data-cy="zip-input"]').clear().type('19801');
    cy.get('[data-cy="search-button"]').click();
    cy.wait('@apiError');

    // Verify that an error message is displayed
    cy.contains('Error').should('be.visible');
  });
}); 