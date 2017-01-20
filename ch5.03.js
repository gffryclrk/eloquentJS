var ancestry = JSON.parse(ANCESTRY_FILE);

function average(array){
	function plus(a, b) { return a + b; }
	return array.reduce(plus) / array.length;
}

var byCentury = {};
ancestry.forEach(function(person){
	var century = Math.ceil(person.died / 100); 

	if(typeof byCentury[century] == "undefined") { byCentury[century] = [];	}
	byCentury[century].push(person.died - person.born);
});

for(var key in byCentury){
	if(byCentury.hasOwnProperty(key)){
		console.log(key + " " + average(byCentury[key]));
	}
}