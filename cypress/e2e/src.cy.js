/*
 * Chart is correctly generated
 */

it('Chart is correctly generated', () => {
  //Visit Website...
  cy.visit('/')
  //Get link and click the link for Line to create a chart
  cy.findByRole("link", {name: "Line"}).click()
  //Create a title
  cy.createChart("Cats vs. Dogs", "Cats", "Dogs")
  //Enter values
  cy.addValues("FALSE", "4", "5", "1", "3")
  cy.addValues("TRUE", "6", "7", "2", "7")
  cy.addValues("TRUE", "8", "9", "3", "15")
  cy.addValues("TRUE", "10", "11", "4", "25")
  cy.addValues("TRUE", "12", "13", "5", "40")
  //Click generate chart button
  cy.findByRole("button", {name: "Generate chart"}).click()
  //Assert that the chart should exist.
  cy.findByRole("img").should("exist")
})
