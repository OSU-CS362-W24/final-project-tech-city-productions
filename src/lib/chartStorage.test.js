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

// make available all of the functions from chartStorage.js
const chartStorage = require("./chartStorage")
const saveChart = chartStorage.saveChart
const loadAllSavedCharts = chartStorage.loadAllSavedCharts
const loadSavedChart = chartStorage.loadSavedChart
const updateCurrentChartData = chartStorage.updateCurrentChartData
const loadCurrentChartData = chartStorage.loadCurrentChartData

// test that saveChart stores the chart in the localStorage
test("chart saved to localStorage", function(){
    // arrange:
    initDomFromFiles(`${__dirname}/../index.html`, `${__dirname}/chartStorage.js`)

    // act:    	
    saveChart("testchart0")

    // assert: that 'testchart' is in the array of charts
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

    // assert: that 'testchart0-3' is in the array of charts
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

    // assert: that 'testchart1' is no longer in the array
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

    // assert: that outPut is the same as the array
    const outPut = loadAllSavedCharts()
    expect(outPut).toStrictEqual(["testchart1","testchart2","testchart3"])    
})

// test that loadSavedChart(idx) returns the second chart when idx = 1
test("loadSavedChart(idx) produces the second chart when idx = 1", function(){
    // arrange:
    initDomFromFiles(`${__dirname}/../index.html`, `${__dirname}/chartStorage.js`)

    // act:    	
    saveChart("testchart1")
    saveChart("testchart2")
    saveChart("testchart3")

    // assert: that outPut is the second chart in array
    const outPut = loadSavedChart(1)
    expect(outPut).toBe("testchart2")    
})

// test that loadSavedChart(idx) returns the empty set when the array is empty
test("loadSavedChart() returns the empty set when the array is empty", function(){
    // arrange:
    initDomFromFiles(`${__dirname}/../index.html`, `${__dirname}/chartStorage.js`)

    // act:    	
    // do nothing to test empty array

    // assert: that outPut is the empty set
    const outPut = loadSavedChart(0)
    expect(outPut).toStrictEqual({})    
})

// test that updateCurrentChartData stores the data in current chart
test("updateCurrentChartData stores the data in current chart", function(){
    // arrange:
    initDomFromFiles(`${__dirname}/../index.html`, `${__dirname}/chartStorage.js`)
        	
    const testChart = {
        type: "line",
        data: [{x:23,y:1}],
        xLabel: "xLabel",
        yLabel: "yLabel",
        title: "test-title",
        color: "#ff4500"
        }

    // act:
    updateCurrentChartData(testChart)

    // assert: currentChartData is equal to the testChart data
    const updatedChart = JSON.parse(window.localStorage.getItem("currentChartData"))
    expect(updatedChart).toEqual({
        type: "line",
        data: [{x:23,y:1}],
        xLabel: "xLabel",
        yLabel: "yLabel",
        title: "test-title",
        color: "#ff4500"
        })    
})

// test that loadCurrentChartData stores the data in current chart
test("loadCurrentChartData stores the data in current chart", function(){
    // arrange:
    initDomFromFiles(`${__dirname}/../index.html`, `${__dirname}/chartStorage.js`)
        	
    const testChart = {
        type: "line",
        data: [{x:23,y:1}],
        xLabel: "xLabel",
        yLabel: "yLabel",
        title: "test-title",
        color: "#ff4500"
        }
        
    // act:
    updateCurrentChartData(testChart)

    // assert: currentChartData is equal to the testChart data
    expect(loadCurrentChartData()).toEqual({
        type: "line",
        data: [{x:23,y:1}],
        xLabel: "xLabel",
        yLabel: "yLabel",
        title: "test-title",
        color: "#ff4500"
        })    
})

// test that loadCurrentChartData returns the empty set when no chart data
test("loadCurrentChartData returns empty array when no data", function(){
    // arrange:
    initDomFromFiles(`${__dirname}/../index.html`, `${__dirname}/chartStorage.js`)
        
    // act:
    // do nothing

    // assert: returns empty set when currentChartData is empty
    expect(loadCurrentChartData()).toEqual({})    
})