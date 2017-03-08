// Numbers Again
// My number regex passes the tests. 
// The Author's solution is similar but with some subtle differences. 
// I cannot tell whose is better; perhaps there are multiple solutions to this problem. 


// var number = /^(\d*\.\d+)|(\d+\.?\d*)$/;
// var number = /^([+-]?[0-9]+)?(\b\.|\.\b|\d\.\d)?([+-]?[0-9]+)?(e[+-]?[0-9])?$/;

// var number = /^[+-]?((\d+\.)|(\.\d*)|\d)(\d{0,}?[+-]?[0-9]+)?([eE][+-]?[0-9]+)?$/;
// var number = /^([+-]?[0-9]+)?(\b\.|\.\b|\d\.\d)?([+-]?[0-9]+)?([eE][+-]?[0-9]+)?$/;
var number = /^[+-]?((\d+\.\d*)|(\.\d+)|\d+)([eE][+-]?[0-9]+)?$/;

// Tests:
["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4",
 "1e+12"].forEach(function(s) {
  if (!number.test(s))
    console.log("Failed to match '" + s + "'");
});
["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5",
 "."].forEach(function(s) {
  if (number.test(s))
    console.log("Incorrectly accepted '" + s + "'");
});