//Deep Comparison

var deepEqual = function(obj1, obj2){
	var equal = true;
	if(typeof obj1 == 'object' && typeof obj2 == 'object' && obj1 !== null && obj2 !== null){
		for(var property in obj1){
			if ( obj1.hasOwnProperty(property) ){
				if ( obj1.property !== obj2.property ) equal = false;
			}
		}
	}else{
		equal = false;
	}
	return equal;
}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true