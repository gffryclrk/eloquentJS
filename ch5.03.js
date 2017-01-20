var ancestry = JSON.parse(ANCESTRY_FILE);

function average(array){
	function plus(a, b) { return a + b; }
	return array.reduce(plus) / array.length;
}

var i = 0;
var byCentury = {};
ancestry.forEach(function(person){
	var century = Math.ceil(person.died / 100); 
	console.log(typeof century);

	// console.log(century);
	if(typeof byCentury[century] == "undefined") { byCentury[century] = [];	}
	// if(typeof byCentury[century] == 'undefined') var byCentury[century] = [];
	byCentury[century].push(person.died - person.born);
});

for(var key in byCentury){
	if(byCentury.hasOwnProperty(key)){
		console.log(key + " " + average(byCentury[key]));
	}
}