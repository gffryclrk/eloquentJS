//A List

var arrayToList = function(array, index){
	if(typeof index == 'undefined'){ 
		index = 0; 
	}
	if(index >= array.length){ 
		var rest = null; 
	}else{
		//var nextIndex = index + 1;
		var nextRest = arrayToList(array, (index + 1));
		var rest = { value: array[index], rest: nextRest };
	}
	return rest;

}

var listToArray = function(list){

	array = [];
	parseList(list);

	function parseList(list){

		var value = list.value;
		var rest = list.rest;

		array.push(value);
		if (rest !== null) parseList(rest);
	}

	return array;
}

var prepend = function(element, list){
	//takes an element and a list and creates a new list that adds the element
	//to the front of the input list
	output = { value: element, rest: list };
	//return { value: element, rest: list };
	return output;

}

var nth = function(list, number){
	//returns the element at the given position in the list
	//or undefined when there is no such element
	var arrayList = listToArray(list);
	//arrayList.push("0");
	if(number <= ( arrayList.length)){
		return arrayList[number - 1];
	}else{
		return undefined;
	}
}