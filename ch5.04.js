function every(array, f){
	var status = true;
	array.forEach(function(element){
		if (f(element) !== true) status = false; 
	})
	return status;
}
// My above function, every() is technically incorrect but works.
// Wile writing I couldn't think of any reason not to simply use the .forEach method on the supplied array.
// However, upon reviewing the solutions after completing my code, I thought about the scenario where the first
// element of the array passes false. In this case you would want to exit the function because the rest of the test
// doesn't really matter. I left my original code here because there was no real reason to change it having already 
// looked at the answer. 


function some(array, f){
	// var status = false;
	for (var i = 0; i < array.length; i++){
		if (f(array[i])) return true;
	}
	return false;
}

console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false