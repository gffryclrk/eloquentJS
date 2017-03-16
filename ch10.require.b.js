// var weekDay = function(){
// 	var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// 	return {
// 		name: function(number) {
// 			return names[number];
// 		},
// 		number: function(name){
// 			return names.indexOf(name);	
// 		}
// 	};
// }();

(function(exports){
	var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	exports.name = function(number){
		return names[number];	
	};
	exports.number = function(name){
		return names.indexOf(name);
	};
})(this.weekDay = {});

function require(name) {
	// I commented out the Author's code and removed readFile to test with the above construct
	// It doesn't work. I was trying to work around the readFile() fn which isn't defined and thus I can't use

	// I understand, now, what the author is trying to communicate: These different modules are contained within different files.
	// In the example code, at a first reading, I didn't find this to be particularly obvious. 

	// var code = new Function("exports", readFile(name));
	var code = new Function("exports", name);
	var exports = {};
	code(exports);
	return exports;
}