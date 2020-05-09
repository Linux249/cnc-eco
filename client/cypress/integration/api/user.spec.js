/// <reference types="cypress" />

context('User saved bases', () => {
    before(() => {
        // set context for api
        cy.visit('localhost:3000')
    })
    // beforeEach(() => {
    //     cy.visit('https://example.cypress.io/commands/network-requests')
    // })

    it('save base with out login', () => {
        cy.request('/api/v2/user/bases')
            .then((response) => {
                // https://on.cypress.io/assertions
                expect(response).property('status').to.equal(200)
                expect(response).property('body').to.have.length(500)
                expect(response).to.include.keys('headers', 'duration')
            })
    })
});
