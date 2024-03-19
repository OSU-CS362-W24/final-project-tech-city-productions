/**
* @jest-environment ./src/fixjsdomenvironment.js
*/

// code taken from lecture example / piazza help post 

const fs = require("fs")
require("whatwg-fetch")
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

// make available all of the functions from generateChartImg.js
const generateChartImg = require("./generateChartImg")


// test that generateChartImg() returns a url to the chart
test("that generateChartImg() returns a url to the chart", async function(){
    // arrange:
    initDomFromFiles(`./src/line/line.html`, `${__dirname}/generateChartImg.js`)
        	
    // act:
    const theURL = await generateChartImg("line", [{x:23,y:1}], "xLabel", "yLabel", "test-title", "#ff4500")
        
    // assert: 
    expect(theURL).toContain("blob:nodedata:")    
})