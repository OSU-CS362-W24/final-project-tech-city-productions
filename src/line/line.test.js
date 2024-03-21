/**
 * @jest-environment jsdom
 */

const fs = require("fs")

function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    /*jest.isolateModules(function () {
        require(jsPath)
        })*/
    require(jsPath)
}

require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom")
const exp = require("constants")
const sortPoints = require("../lib/sortPoints.js")

const userEvent = require("@testing-library/user-event").default




test("Video 1: Can add text to x/y input fields. New feilds are empty and don't affect old fields.", async function () {
    initDomFromFiles(
    `${__dirname}/line.html`,
    `${__dirname}/line.js`
    )
    //get all xyinput fields
    xyInputFields = domTesting.getAllByTestId(document, "x-y-input");
    
    const addFieldButton = domTesting.getByText(document, "+");

    const user = userEvent.setup();

    //add numbers to first fields
    await user.type(xyInputFields[0], "21");
    await user.type(xyInputFields[1], "6");
    //make sure they were filled
    expect(xyInputFields[0]).toHaveValue();
    expect(xyInputFields[1]).toHaveValue();


    //add a couple more fields
    await user.click(addFieldButton);
    await user.click(addFieldButton);
    //update the list after we added more fields
    xyInputFields = domTesting.getAllByTestId(document, "x-y-input");

    //make sure the first pair of fields are still filled with content
    expect(xyInputFields[0]).toHaveDisplayValue("21");
    expect(xyInputFields[1]).toHaveDisplayValue("6");
    
    //make sure the other pairs are empty
    expect(xyInputFields[2]).not.toHaveValue();
    expect(xyInputFields[3]).not.toHaveValue();
    expect(xyInputFields[4]).not.toHaveValue();
    expect(xyInputFields[5]).not.toHaveValue();

   

    
    
    })

    test("Video 2: Error message shows up when xy input fields being empty. Even with labels filled", async function () {
        jest.resetModules();        
        initDomFromFiles(
        `${__dirname}/line.html`,
        `${__dirname}/line.js`
        )

        const xLabelField =  domTesting.getByLabelText(document, "X label");
        const yLabelField = domTesting.getByLabelText(document, "Y label");
        const xyInputs = domTesting.getAllByTestId(document, "x-y-input");
        const generateChartBtn = domTesting.getByText(document, "Generate chart");
        
    
        const user = userEvent.setup();
    
        //add Labels
        await user.type(xLabelField, "Cats");
        await user.type(yLabelField, "Dogs");
        //make sure they were filled
        expect(xLabelField).toHaveValue();
        expect(yLabelField).toHaveValue();
        //make sure xy inputs are empty
        await user.clear(xyInputs[0]);
        await user.clear(xyInputs[1]);
        expect(xyInputs[0]).not.toHaveValue();
        expect(xyInputs[1]).not.toHaveValue();
    
        //Click Generate chart
        //TODO: CHECK IF WINDOW.ALERT is the right name
        const alertSpy = jest.spyOn(window, 'alert');
        alertSpy.mockImplementation(function(alertMessage){
            console.log(alertMessage);
        })
        
        await user.click(generateChartBtn);

        expect(alertSpy).toHaveBeenCalledWith("Error: No data specified!");

        alertSpy.mockRestore();
        
        
        
        })

    test("Video 3: Error message shows up generating chart with empty xy labels and filled xy inputs", async function () {
            jest.resetModules();        
            initDomFromFiles(
            `${__dirname}/line.html`,
            `${__dirname}/line.js`
            )
    
            const xLabelField =  domTesting.getByLabelText(document, "X label");
            const yLabelField = domTesting.getByLabelText(document, "Y label");
            const generateChartBtn = domTesting.getByText(document, "Generate chart");
            const addFieldButton = domTesting.getByText(document, "+");

        
            const user = userEvent.setup();
        
            //clear xy Labels
            await user.clear(xLabelField);
            await user.clear(yLabelField);
             //make sure they are empty
             expect(xLabelField).not.toHaveValue();
             expect(yLabelField).not.toHaveValue();
            //add a few xy fields
            await user.click(addFieldButton);
            await user.click(addFieldButton);
            //get the xy input fields
            const xyInputs = domTesting.getAllByTestId(document, "x-y-input");
            //fill them
            await user.type(xyInputs[0], "14");
            await user.type(xyInputs[1], "45");
            await user.type(xyInputs[2], "4");
            await user.type(xyInputs[3], "24");
            await user.type(xyInputs[4], "4");
            await user.type(xyInputs[5], "3");

        
            //Click Generate chart
            const alertSpy = jest.spyOn(window, 'alert');
            alertSpy.mockImplementation(function(alertMessage){
                console.log(alertMessage);
            })
            
            await user.click(generateChartBtn);
    
            expect(alertSpy).toHaveBeenCalledWith("Error: Must specify a label for both X and Y!");
    
            alertSpy.mockRestore();
            
            
            
            })

    test("Video 4: Clear chart data resets input fields, labels, and color", async function () {
                jest.resetModules();        
                initDomFromFiles(
                `${__dirname}/line.html`,
                `${__dirname}/line.js`
                )
        
                const charTitleField = domTesting.getByLabelText(document, "Chart title");
                const xLabelField =  domTesting.getByLabelText(document, "X label");
                const yLabelField = domTesting.getByLabelText(document, "Y label");
                const clearChartBtn = domTesting.getByText(document, "Clear chart data");
                const addFieldButton = domTesting.getByText(document, "+");
                const colorInput = domTesting.getByLabelText(document, "Chart color");
    
            
                const user = userEvent.setup();
            
                await user.type(charTitleField, "title of stuff");
                //fill xy Labels
                await user.type(xLabelField,"stuff");
                await user.type(yLabelField, "things");
                 //make sure they are full
                 expect(charTitleField).toHaveValue();
                 expect(xLabelField).toHaveValue();
                 expect(yLabelField).toHaveValue();
                //add a few xy fields
                await user.click(addFieldButton);
                await user.click(addFieldButton);
                //get the xy input fields
                 xyInputs = domTesting.getAllByTestId(document, "x-y-input");
                //fill them
                await user.type(xyInputs[0], "14");
                await user.type(xyInputs[1], "45");
                await user.type(xyInputs[2], "4");
                await user.type(xyInputs[3], "24");
                await user.type(xyInputs[4], "4");
                await user.type(xyInputs[5], "3");

                //find the color input thingy
                await user.click(colorInput);

                expect(colorInput).toHaveValue("#ff4500");
                
                //set it to random color
                colorInput.value = '#ff0000';
                expect(colorInput).toHaveValue("#ff0000");

            
                //Click clear chart
               await user.click(clearChartBtn);
                
                //check title is empty
                expect(charTitleField).not.toHaveValue();

                //check that label fields are empty
                expect(xLabelField).not.toHaveValue();
                expect(yLabelField).not.toHaveValue();

                //get updated lists of xy input fields and check they're empty and there's only 2 of them
                xyInputs = domTesting.getAllByTestId(document, "x-y-input");
                    
                expect(xyInputs).toHaveLength(2);
                expect(xyInputs[0]).not.toHaveValue();
                expect(xyInputs[1]).not.toHaveValue();

                //check color was reset to default
                expect(colorInput).toHaveValue("#ff4500");

     
                
                })
    

        test("Video 5: Generate chart button succesffully calls generatecharimg with parameters", async function () {
                    jest.resetModules();        
                    initDomFromFiles(
                    `${__dirname}/line.html`,
                    `${__dirname}/line.js`
                    )
            
                    const charTitleField = domTesting.getByLabelText(document, "Chart title");
                    const xLabelField =  domTesting.getByLabelText(document, "X label");
                    const yLabelField = domTesting.getByLabelText(document, "Y label");
                    const generateChartBtn = domTesting.getByText(document, "Generate chart");
                    const addFieldButton = domTesting.getByText(document, "+");
                    const colorInput = domTesting.getByLabelText(document, "Chart color");
        
                
                    const user = userEvent.setup();

                //FILLING IN THE FIELDS


                    await user.type(charTitleField, "title of stuff");
                    //fill xy Labels
                    await user.type(xLabelField,"stuff");
                    await user.type(yLabelField, "things");
                     //make sure they are full
                     expect(charTitleField).toHaveValue();
                     expect(xLabelField).toHaveValue();
                     expect(yLabelField).toHaveValue();
                    //add a few xy fields
                    await user.click(addFieldButton);
                    await user.click(addFieldButton);
                    //get the xy input fields
                     xyInputs = domTesting.getAllByTestId(document, "x-y-input");
                    //fill them
                    await user.type(xyInputs[0], "14");
                    await user.type(xyInputs[1], "45");
                    await user.type(xyInputs[2], "4");
                    await user.type(xyInputs[3], "24");
                    await user.type(xyInputs[4], "4");
                    await user.type(xyInputs[5], "3");
    
                    //find the color input thingy
                    await user.click(colorInput);
    
                    expect(colorInput).toHaveValue("#ff4500");
                    
                    //set it to random color
                    colorInput.value = '#ff0000';
                    expect(colorInput).toHaveValue("#ff0000");
    
                //GENERATING THE CHART

                jest.mock("../lib/generateChartImg.js")

                const generateChartImgSpy = require("../lib/generateChartImg.js")

                generateChartImgSpy.mockImplementation(function(type, data, xLabel, yLabel, title, color){
                    return "http://placekitten.com/480/480";
                })


                //click generate button

                await user.click(generateChartBtn); // now clicking the generate chart button
                

                
                let data = [];

                // Iterate over the numbers two at a time
                for (let i = 0; i < xyInputs.length; i += 2) {
                    // Push an object with x and y properties to the data array
                    data.push({ x: xyInputs[i].value.toString(), y: xyInputs[i+1].value.toString() });
                }

                //sort the points using the same function chartBuilder uses.
                sortPoints(data)
                
                expect(generateChartImgSpy).toHaveBeenCalledWith("line",data, xLabelField.value, yLabelField.value, charTitleField.value, colorInput.value);

                //after checking that the button correctly calls generateChart with the right values,
                //we check if our stub is returning the right value
                
                expect(generateChartImgSpy()).toBe("http://placekitten.com/480/480");
    
         
                    
                    })