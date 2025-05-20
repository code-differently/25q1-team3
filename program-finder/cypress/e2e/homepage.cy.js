describe('testing on homepage', () => {

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
    Cypress.on('uncaught:exception', () => {});
  });

  it('navigates to program details', () => {
    cy.visit('http://localhost:3000');
    cy.wait(3000);
    cy.get('[data-cy="nav-more"]').click();
    cy.get('[data-cy="nav-programs"]').should('be.visible').click();
    cy.url().should('include', '/programs');
  });
  it('types into zip code field', () => {
    cy.visit('/')
    cy.get('[data-cy="zip-input"]').type("19801")
  });
  
})