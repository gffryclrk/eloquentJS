var reverseArray = function(arrayIn){
	arrayOut = [];
	for(i = 0; i <= arrayIn.length; i++){
		n = arrayIn.length - i;
		arrayOut[i] = arrayIn[n];
	}
	return arrayOut;
}

var reverseArrayInPlace = function(arrayIn){
	halfLength = Math.floor(arrayIn.length / 2);
	for(i = 0; i <= halfLength; i++){
		pos = arrayIn.length - 1 - i;
		hold = arrayIn[pos];
		arrayIn[pos] = array[i];
		array[i] = hold;
	}
}