/**
 * @jest-environment jsdom
 */

// code taken from lecture example

//require("whatwg-fetch")
const fs = require("fs")
const domTesting = require('@testing-library/dom')
require('@testing-library/jest-dom')
//const userEvent = require("@testing-library/user-event").default

function initDomFromFiles(htmlPath, jsPath) {
	const html = fs.readFileSync(htmlPath, 'utf8')
	document.open()
	document.write(html)
	document.close()
	jest.isolateModules(function() {
		require(jsPath)
	})
}

const chartStorage = require("./chartStorage")

const saveChart = chartStorage.saveChart

// test that saveChart stores the chart in the localStorage
test("chart saved to localStorage", async function(){
    // arrange:
    initDomFromFiles(`${__dirname}/../index.html`, `${__dirname}/chartStorage.js`)

    // act:    	
    saveChart("testchart")

    // assert that 'testchart' is in the array of charts
    const savedChart = window.localStorage.getItem("savedCharts")
    expect(savedChart).toContain("testchart")    
})