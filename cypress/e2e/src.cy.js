/*
 * Chart is correctly generated
 */

it('Chart is correctly generated', () => {
  //Visit Website...
  cy.visit('/')
  cy.get("h1").should("exist")
  //Get link and click the link for Line to create a chart
  cy.findByRole("link", {name: "Line"}).click()
  //Assert that Cypress press the correct link.
  cy.findByText("Line Chart Builder").should("exist")
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
  cy.get("h1").should("exist")
  //Get link and click the link for Line to create a chart
  cy.findByRole("link", {name: "Line"}).click()
  cy.findByText("Line Chart Builder").should("exist")
  //Create a title
  cy.createChart("Cats vs. Dogs", "Cats", "Dogs")
  //Enter values
  cy.addValues("FALSE", "4", "5", "1", "3")
  cy.addValues("TRUE", "6", "7", "2", "7")
  cy.addValues("TRUE", "8", "9", "3", "15")
  cy.addValues("TRUE", "10", "11", "4", "25")
  cy.addValues("TRUE", "12", "13", "5", "40")
  cy.findByRole("button", {name: "+"}).click()

  /* Assert that values are maintained across pages. */
  
  //Go to Scatter Chart Builder and check if the same numbers exists
  cy.findByRole("link", {name: "Scatter"}).click()
  cy.findByText("Scatter Plot Builder").should("exist")
  cy.checkValues("4", "5", "1", "3")
  cy.checkValues("6", "7", "2", "7")
  cy.checkValues("8", "9", "3", "15")
  cy.checkValues("10", "11", "4", "25")
  cy.checkValues("12", "13", "5", "40")
  //Go to Bar Chart Builder and check if the same number exists
  cy.findByRole("link", {name: "Bar"}).click()
  cy.findByText("Bar Chart Builder").should("exist")
  cy.checkValues("4", "5", "1", "3")
  cy.checkValues("6", "7", "2", "7")
  cy.checkValues("8", "9", "3", "15")
  cy.checkValues("10", "11", "4", "25")
  cy.checkValues("12", "13", "5", "40")
  //Go back to Line Chart Builder and check if the same number exists
  cy.findByRole("link", {name: "Line"}).click()
  cy.findByText("Line Chart Builder").should("exist")
  cy.checkValues("4", "5", "1", "3")
  cy.checkValues("6", "7", "2", "7")
  cy.checkValues("8", "9", "3", "15")
  cy.checkValues("10", "11", "4", "25")
  cy.checkValues("12", "13", "5", "40")
})

it('Saving a chart to the “gallery”', () => {
  // Visit Website...
  cy.visit('/')
  cy.get("h1").should("exist")
  // Get link and click the link for Line to create a chart
  cy.findByRole("link", {name: "Line"}).click()
  cy.findByText("Line Chart Builder").should("exist")
  // Create a title
  cy.createChart("Cats vs. Dogs", "Cats", "Dogs")
  // Enter values
  cy.addValues("FALSE", "4", "5", "1", "3")
  cy.addValues("TRUE", "6", "7", "2", "7")
  cy.addValues("TRUE", "8", "9", "3", "15")
  cy.addValues("TRUE", "10", "11", "4", "25")
  cy.addValues("TRUE", "12", "13", "5", "40")
  cy.findByRole("button", {name: "+"}).click()
  // Click generate chart button
  cy.findByRole("button", {name: "Generate chart"}).click()
  // Assert that the chart should exist.
  cy.findByRole("img").should("exist")

  // Save the chart in the gallery, jump to the gallery, and then assert the img exists in the gallery.
  cy.findByRole("button", {name: "Save chart"}).click()
  cy.findByRole("link", {name: "Gallery"}).click()
  // Assert Cypress jump to Gallery
  cy.get("h1").should("exist")
  cy.findByRole("img").should("exist")
})

it('Re-opening a saved chart', () => {
  // Visit Website...
  cy.visit('/')
  cy.get("h1").should("exist")
  // Get link and click the link for Line to create a chart
  cy.findByRole("link", {name: "Line"}).click()
  cy.findByText("Line Chart Builder").should("exist")
  // Create a title
  cy.createChart("Cats vs. Dogs", "Cats", "Dogs")
  // Enter values
  cy.addValues("FALSE", "4", "5", "1", "3")
  cy.addValues("TRUE", "6", "7", "2", "7")
  cy.addValues("TRUE", "8", "9", "3", "15")
  cy.addValues("TRUE", "10", "11", "4", "25")
  cy.addValues("TRUE", "12", "13", "5", "40")
  cy.findByRole("button", {name: "+"}).click()
  // Click generate chart button
  cy.findByRole("button", {name: "Generate chart"}).click()
  // Assert that the chart should exist.
  cy.findByRole("img").should("exist")
  // Save the chart in the gallery, jump to the gallery, and then assert the img exists in the gallery.
  cy.findByRole("button", {name: "Save chart"}).click()
  cy.findByRole("link", {name: "Gallery"}).click()
  cy.get("h1").should("exist")
  cy.findByRole("img").should("exist")

  //Click the image and assert that Cypress jumps to "Line Chart Builder"
  cy.findByRole("img").click()
  cy.findByText("Line Chart Builder").should("exist")

  //Assert Title and labels are the same.
  cy.findByRole("textbox", {name: "Chart title"}).should("have.value", "Cats vs. Dogs")
  cy.findByRole("textbox", {name: "X label"}).should("have.value", "Cats")
  cy.findByRole("textbox", {name: "Y label"}).should("have.value", "Dogs")
  //Assert the numbers are the same as the ones entered to create a chart.
  cy.checkValues("4", "5", "1", "3")
  cy.checkValues("6", "7", "2", "7")
  cy.checkValues("8", "9", "3", "15")
  cy.checkValues("10", "11", "4", "25")
  cy.checkValues("12", "13", "5", "40")
})