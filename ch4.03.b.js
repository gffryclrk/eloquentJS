var arrayToList = function(array){
	var list = {};
	var rest = null;
	for(var i = array.length; i >= 0; i--){
		list = { value: array[i], rest: rest};
		rest = list;
	}
	return list;
}
/*
var listToArray = function(list, array){
	if(array == undefined) var array = [];
	if(list.rest == null){
		return array;
	}else{
		array.push(list.value);
		listToArray(list.rest, array);
	}
} */
var listToArray = function(list){
	var array = [];
	while(list.rest !== null){
		array.push(list.value);
		list = list.rest;
	}
	return array;
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
//console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
//console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20