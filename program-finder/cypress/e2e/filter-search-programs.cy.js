describe('testing search and filter feature', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err) => {
      if (
        err.message.includes('Hydration failed') ||
        err.message.includes('error while hydrating')
      ) {
        return false;
      }
    });
  });

  afterEach(() => {
    Cypress.on('uncaught:exception', () => { });
  });

  it('navigates to CYPHER', () => {
    // Visit the homepage
    cy.visit('http://localhost:3000');

    // Wait for the page to load
    cy.wait(3000);
  });

  it('types into zip code field', () => {
    cy.visit('/')
    cy.get('[data-cy="zip-input"]').type("19801");
  });
  it('clicks the submit button', () => {
    cy.visit('/')
    cy.get('[data-cy="search-button"]').click();
  });

  it('types in the keyword textarea', () => {
    cy.visit('/')
    cy.get('[data-cy="keyword-input"]').type("art");
  });

  it('should display the Find Program button', () => {
    cy.visit('/');
    cy.get('[data-cy="find-program-btn"]')
      .should('exist')
      .should('be.visible')
      .contains('Find Program', { matchCase: false });
  });
  it('should navigate once find program button is submitted', () => {
    cy.visit('/');
    cy.get('[data-cy="find-program-btn"]').click();
    cy.url().should('include', '/programs');
  });
  it('should display filter button', () => {
    cy.visit('/');
    cy.get('button[type="button"]').should('exist').should('be.visible');
    // Fresh query — avoids stale DOM reference
    cy.contains('Show Filters', { matchCase: false });
  });

  // This goes inside your existing describe block OR just as top-level tests
  it('should display filters when "Show Filters" is clicked', () => {
    cy.visit('/');
    cy.contains('Show Filters').click();
    cy.get('select[name="ageGroup"]').should('exist').and('contain', 'All Ages');
  });

  it('should allow selecting an age group from the dropdown', () => {
    cy.visit('/');
    cy.contains('Show Filters').click();
    // Wait for the dropdown
    cy.get('select[name="ageGroup"]').should('exist');
    // Select by value
    cy.get('select[name="ageGroup"]').select('teens');
    // Assert it's selected
    cy.get('select[name="ageGroup"]').should('have.value', 'teens');
    
    it('should allow selecting an age group from the dropdown', () => {
      cy.visit('/');
      cy.contains('Show Filters').click();
    //Assert category is selected
    cy.get('select[name="category"]').should('exist');
    
    cy.get('select[name="category"]').select('Education')
  });
  // Clear the selected info


});
