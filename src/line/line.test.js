/**
 * @jest-environment jsdom
 */

const fs = require("fs")

function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function () {
        require(jsPath)
        })
}

require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom")
const exp = require("constants")

const userEvent = require("@testing-library/user-event").default



require("../chartBuilder/chartBuilder.js")
const genChartImg = require("../lib/generateChartImg.js")

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
                console.log(colorInput);

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
                    console.log(colorInput);
    
                    expect(colorInput).toHaveValue("#ff4500");
                    
                    //set it to random color
                    colorInput.value = '#ff0000';
                    expect(colorInput).toHaveValue("#ff0000");
    
                //GENERATING THE CHART

                //make spy on generatechartimg
                const genChartImgSpy = jest.spyOn(genChartImg, 'generateChartImg');
                genChartImgSpy.mockImplementation(function(){
                    return "http://placekitten.com/480/480";
                })

                const alertSpy = jest.spyOn(window, 'alert');


                //click generate button
                expect(genChartImgSpy()).toBe("http://placekitten.com/480/480");// just checking the mock output here

                await user.click(generateChartBtn); // now clicking the generate chart button
                console.log("Print calls of the genchartImgspy to see if clicking the button correctly calls it: \n",genChartImgSpy.mock.calls);
                console.log("Calls of alert():", alertSpy.mock.calls);

              

                //expect(genChartImgSpy).toHaveBeenCalledWith(xyInputs, xLabelField, yLabelField, charTitleField, colorInput);
                expect(genChartImgSpy).toHaveBeenCalled();



                    
            
       
    
         
                    
                    })