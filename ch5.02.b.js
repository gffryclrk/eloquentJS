var ancestry = JSON.parse(ANCESTRY_FILE);

function average(array) {
	function plus(a, b) { return a + b; }
	return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person){
	byName[person.name] = person;
});

var ageDifference = ancestry.map(function(person){
	// return person.born - byName[person.mother].born;
	if(byName[person.mother]) return person.born - byName[person.mother].born; else return null;
});

var ageDifference = ageDifference.filter(function(difference){
	if (difference !== null) return difference;
});

var averageBirthAge = average(ageDifference);