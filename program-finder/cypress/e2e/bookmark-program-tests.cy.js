describe('test for bookmarking programs', () => {
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
    it('navigates to "bookmark programs" tab', () => {
        cy.visit('/');
        cy.get('[data-cy="nav-more"]').click();
        cy.get('[data-cy="nav-bookmarks"]').click();
        cy.url().should('include', "http://localhost:3000/login");
        cy.get('#email').type("chutt251@gmail.com");
        cy.get('#password').type('Welcome#1');
        cy.get('.login-button').click();
        cy.wait(2500)
    });

    it('renders bookmark page', () => {
        cy.visit('/');
        cy.get('[data-cy="nav-more"]').click();
        cy.get('[data-cy="nav-bookmarks"]').click();
        cy.url().should('include', "http://localhost:3000/bookmarks");
        cy.get('[data-cy="nav-more"]').click();
        cy.get('[data-cy="nav-bookmarks"]').click()
    });
    after(() => {
        cy.wait(5000)
        cy.get('.profile-initial').click()
        cy.get('.dropdown-menu > :nth-child(4) > .dropdown-menu-item').click()
       
    });
});
