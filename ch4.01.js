var range = function(start, end, step){
	var array = [];

	if (typeof step === 'undefined') { 
		step = 1;
		if (start > end) { step = -1; } 
	}
	if(step > 0)
		for(i = start; i <= end; i = i + step){
			array.push(i);
			//i = i - 1 + step;
		}	
	else if(step < 0){
		for(i = start; i >= end; i = i + step){
			array.push(i);
			//i = i + 1 - step;
		}
	}
	
	return array;

}

var sum = function(array){
	var total = 0;
	for (var i = 0; i < array.length; i++){
		var total = total + array[i];
	}
	return total;
}