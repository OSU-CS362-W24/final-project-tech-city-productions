/**
 * @jest-environment jsdom
 */

// code taken from lecture example

const fs = require("fs")
const domTesting = require('@testing-library/dom')
require('@testing-library/jest-dom')

function initDomFromFiles(htmlPath, jsPath) {
	const html = fs.readFileSync(htmlPath, 'utf8')
	document.open()
	document.write(html)
	document.close()
	jest.isolateModules(function() {
		require(jsPath)
	})
}
// clear localStorage after each test
beforeEach(() => {
    window.localStorage.clear()
})

const chartStorage = require("./chartStorage")

const saveChart = chartStorage.saveChart
const loadAllSavedCharts = chartStorage.loadAllSavedCharts

// test that saveChart stores the chart in the localStorage
test("chart saved to localStorage", function(){
    // arrange:
    initDomFromFiles(`${__dirname}/../index.html`, `${__dirname}/chartStorage.js`)

    // act:    	
    saveChart("testchart0")

    // assert that 'testchart' is in the array of charts
    const savedChart = window.localStorage.getItem("savedCharts")
    expect(savedChart).toContain("testchart")    
})

// test that saveChart stores consecutive charts to the end of the array
test("consecutive charts saved to end of array", function(){
    // arrange:
    initDomFromFiles(`${__dirname}/../index.html`, `${__dirname}/chartStorage.js`)

    // act:    	
    saveChart("testchart0")
    saveChart("testchart1")
    saveChart("testchart2")
    saveChart("testchart3")

    // assert that 'testchart0-3' is in the array of charts
    const savedChart = window.localStorage.getItem("savedCharts")
    expect(savedChart).toBe("[\"testchart0\",\"testchart1\",\"testchart2\",\"testchart3\"]")
})

// test that saveChart overwrites a chart given the same index
test("chart overwrites saved to localStorage", function(){
    // arrange:
    initDomFromFiles(`${__dirname}/../index.html`, `${__dirname}/chartStorage.js`)

    // act:    	
    saveChart("testchart1")
    saveChart("testchart2")
    saveChart("testchart3", 0)

    // assert that 'testchart1' is no longer in the array
    const savedChart = window.localStorage.getItem("savedCharts")
    expect(savedChart).not.toContain("testchart1")    
})

// test that loadAllSavedCharts() returns the array of saved charts
test("loadAllSavedCharts() produces the array of saved charts", function(){
    // arrange:
    initDomFromFiles(`${__dirname}/../index.html`, `${__dirname}/chartStorage.js`)

    // act:    	
    saveChart("testchart1")
    saveChart("testchart2")
    saveChart("testchart3")

    // assert that 'testchart1' is no longer in the array
    const outPut = loadAllSavedCharts()
    expect(outPut).toStrictEqual(["testchart1","testchart2","testchart3"])    
})