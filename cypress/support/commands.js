// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

require("@testing-library/cypress/add-commands")

Cypress.Commands.add("createChart", function(title, Xlabel, Ylabel){
    cy.findByText("Chart title").type(title)
    cy.findByText("X label").type(Xlabel)
    cy.findByText("Y label").type(Ylabel)
})

Cypress.Commands.add("addValues", function(bool, xIdx, yIdx, xVal, yVal){
    //TRUE means to add new values, it needs a new textbox.
    if(bool === "TRUE"){
        cy.findByRole("button", {name: "+"}).click()
    }

    cy.get(':nth-child(' + xIdx + ') > .x-value-input').type(xVal)
    cy.get(':nth-child(' + yIdx + ') > .y-value-input').type(yVal)
})

Cypress.Commands.add("checkValues", function(xIdx, yIdx, xVal, yVal){
    cy.get(':nth-child(' + xIdx + ') > .x-value-input').should("have.value", xVal)
    cy.get(':nth-child(' + yIdx + ') > .y-value-input').should("have.value", yVal)
})