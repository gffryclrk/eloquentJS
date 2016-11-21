
var reverseArray = function(array){
	var newArray = [];
	for(var i = 1; i <= array.length; i++){
		newArray[i - 1] = array[array.length - i];
	}
	return newArray;
}

var reverseArrayInPlace = function(array){
	//var placeHolder = array[0];
	for(var i = 1; i <= Math.round(array.length / 2); i++){
		var hold = array[i - 1];
		array[i - 1] = array[array.length - i];
		array[array.length - i] = hold;
	}
}