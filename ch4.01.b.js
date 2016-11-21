var range = function(start, end, step){
	var output = [];
	if (start < end) {
		if (step == undefined) step = 1;
		for(var i = start; i <= end; i += step){
			output.push(i);
		}
	}else{
		if (step == undefined) step = -1;
		for(var i = start; i >= end; i += step){
			output.push(i);
		}
	}
	return output;
}

var sum = function(array){
	var output = 0;
	for(var i = 0; i < array.length; i++){
		output += array[i];
	}
	return output;
}