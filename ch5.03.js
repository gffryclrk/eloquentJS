var ancestry = JSON.parse(ANCESTRY_FILE);

function average(array){
	function plus(a, b) { return a + b; }
	return array.reduce(plus) / array.length;
}

var byCentury = {};
ancestry.forEach(function(person){
	var century = Math.ceil(person.died / 100); 
	if(typeof byCentury[century] == 'undefined') var byCentury[century] = [];
	byCentury[century].push(person.died - person.born);
});