describe('testing search programs feature', () => {
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
    })