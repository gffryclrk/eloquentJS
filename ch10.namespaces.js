var dayName = function() {
	var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	// return function(number){
	// 	return names[number];	
	// };
	return {
		name: function(number) { return names[number]; },
		number: function(name) { return names.indexOf(name); } 
	};
}();

(function(exports){
	var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	exports.name = function(number){
		return names[number];
	};
	exports.number = function(name){
		return names.indexOf(name);
	};
})(this.weekDay = {});

console.log(weekDay.name(weekDay.number("Saturday")));

