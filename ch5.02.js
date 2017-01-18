var ancestry = JSON.parse(ANCESTRY_FILE);

function average(array) {
	function plus(a, b) { return a + b; }
	return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person){
	byName[person.name] = person;
});

var motherBirthAge = [];
ancestry.forEach(function(person){
	var mother = byName[person.mother];
	//motherBirthAge.push(mother);
	if(typeof mother !== 'undefined') {
		//birthAge = byName[person.born] - mother.born;
		birthAge = person.born - mother.born;
		motherBirthAge.push(birthAge);
		//motherBirthAge.push(person.born - mother.born); 
	}
})

averageAgeDifference = average(motherBirthAge);