var dayName = function(){
	var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return function(number){
		return names[number];
	};
}();


// I still don't understand closures. 
var foo = function(bar){
	return function(baz){
		return "bar: " + bar + " baz: " + baz;	
	};	
}

var foo2 = function(){
	var array = [1,2,3]
	return function(number){
		return array[number];	
	}	
}();