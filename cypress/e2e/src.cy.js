/*
 * Chart is correctly generated
 */

it('Chart is correctly generated', () => {
  //Visit Website...
  cy.visit('/')
  //Get link and click the link for Line to create a chart
  cy.findByRole("link", {name: "Line"}).click()
})
