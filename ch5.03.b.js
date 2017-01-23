var ancestry = JSON.parse(ANCESTRY_FILE);

function average(array){
	function plus(a, b) { return a + b; }
	return array.reduce(plus) / array.length;
}

var yearsBorn = ancestry.map(function(person){

	var century = Math.ceil(person.died / 100);
	return { century: century, year: person.born };
});

//I had to look at the solution for the bonus abstraction: 

function groupBy(array, f){
	var groups = {};
	array.forEach(function(element){
		var groupIndex = f(element);
		if (groupIndex in groups){
			groups[groupIndex].push(element); 
		}else{
			groups[groupIndex] = [element];
		}
	});
	return groups;
}
function groupNames(f){

}

// groupBy(ancestry, function(person){
// 	return Math.ceil(person.died / 100);
// });

// var byCentury = {};
// ancestry.forEach(function(person){
// 	var century = Math.ceil(person.died / 100); 

// 	if(typeof byCentury[century] == "undefined") { byCentury[century] = [];	}
// 	byCentury[century].push(person.died - person.born);
// });

// for(var key in byCentury){
// 	if(byCentury.hasOwnProperty(key)){
// 		console.log(key + " " + average(byCentury[key]));
// 	}
// }