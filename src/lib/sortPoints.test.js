const sortPoints = require("./sortPoints")

test("returns a sorted string based on input", function(){
    expect(sortPoints([{x:23,y:1},{x:12,y:22},{x:55,y:55}])).toStrictEqual([{"x": 12, "y": 22}, {"x": 23, "y": 1}, {"x": 55, "y": 55}])
})

test("returns a sorted string based on input", function(){
    expect(sortPoints([{x:5,y:3},{x:8,y:22},{x:6,y:15}])).toStrictEqual([{"x": 5, "y": 3}, {"x": 6, "y": 15}, {"x": 8, "y": 22}])
})

test("bad input throws an error", function(){
    expect(() => sortPoints("sfdshd")).toThrow(TypeError)
})