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

it('Chart data is maintained across pages', () => {
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
  cy.findByRole("button", "+").click()

  /* Assert that values are maintained across pages. */
  
  //Go to Scatter Chart Builder and check if the same numbers exists
  cy.findByRole("link", {name: "Scatter"}).click()
  cy.checkValues("4", "5", "1", "3")
  cy.checkValues("6", "7", "2", "7")
  cy.checkValues("8", "9", "3", "15")
  cy.checkValues("10", "11", "4", "25")
  cy.checkValues("12", "13", "5", "40")
  //Go to Bar Chart Builder and check if the same number exists
  cy.findByRole("link", {name: "Bar"}).click()
  cy.checkValues("4", "5", "1", "3")
  cy.checkValues("6", "7", "2", "7")
  cy.checkValues("8", "9", "3", "15")
  cy.checkValues("10", "11", "4", "25")
  cy.checkValues("12", "13", "5", "40")
  //Go back to Line Chart Builder and check if the same number exists
  cy.findByRole("link", {name: "Line"}).click()
  cy.checkValues("4", "5", "1", "3")
  cy.checkValues("6", "7", "2", "7")
  cy.checkValues("8", "9", "3", "15")
  cy.checkValues("10", "11", "4", "25")
  cy.checkValues("12", "13", "5", "40")
})