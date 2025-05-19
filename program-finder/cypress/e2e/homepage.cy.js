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
    // Visit the homepage
    cy.visit('http://localhost:3000');

    // Wait for the page to load
    cy.wait(3000);
    
    // Hover over the "Programs" link in the navigation bar
    const programLink = cy.get('#nav > :nth-child(1) > :nth-child(2)');
    programLink.should('be.visible');
    programLink.trigger('mouseover');

    // Click the "All Programs" link in the dropdown
    const allProgramsLink = cy.get('.level-0 > :nth-child(1) > a');
    allProgramsLink.invoke('show').click({force: true});

  });
})