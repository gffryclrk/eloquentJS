var arrayToList = function(array){
	var list = {};
	var rest = null;
	for(var i = 0; i < array.length; i++){
		list = { value: array[i], rest: rest};
		rest = list;
	}
	return list;
}

var listToArray = function(list, array){
	if(array == undefined) var array = [];
	array.push(list.value);
}