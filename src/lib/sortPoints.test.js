const sortPoints = require("./sortPoints")

test("returns a sorted string based on input", function(){
    expect(sortPoints([{x:5,y:3},{x:8,y:22},{x:6,y:15}])).toStrictEqual([{"x": 5, "y": 3}, {"x": 6, "y": 15}, {"x": 8, "y": 22}])
})