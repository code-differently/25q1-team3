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
        cy.get('#zip').type("19801");
        
      });
      it('clicks the submit button', () => {
        cy.visit('/')
        cy.get('input[value="Search"]').click();
      });
      
      it('types in the keyword textarea', () => {
        cy.visit('/')
        cy.get('input#keyword').type("art");
      });
      
        it('should display the Find Program button', () => {
          // Check if the Find Program button exists and is visible
          cy.visit('/');
          cy.get('a[href="#main"]')
            .should('exist')
            .should('be.visible')
            .contains('Find Program', { matchCase: false });
        });
        it('should navigate once find program button is submitted', () => {
            // Click the Find Program button
            cy.visit('/');
            cy.get('a[href="#main"]').click();
             // Verify we've navigated to the programs page
            cy.url().should('include', '/#main');
        });
    })