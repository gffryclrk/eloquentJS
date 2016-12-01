var arrayToList = function(array){
	var list = {};
	var rest = null;
	for(var i = array.length; i >= 0; i--){
		list = { value: array[i], rest: rest};
		rest = list;
	}
	return list;
}
var listToArray = function(list){
	var array = [];
	while(list.rest !== null){
		array.push(list.value);
		list = list.rest;
	}
	return array;
}
var prepend = function(element, list){
	return { value: element, rest: list };
}
var nth = function(list, number){
	//you could do this simply by using listToArray and then returning the element at number index (array[number])
	//I'm going to do it another way, without using the functions I just wrote
	var i = 0;
	while(i <= number){
		var value = list.value;
		list = list.rest;
		i++;
	}
	if(value !== null) return value; else return undefined;
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20