//Deep Comparison

// var deepEqual = function(obj1, obj2){
// 	var equal = true;
	
// 	for(var property in obj1){
// 		if ( obj1.hasOwnProperty(property) ){
// 			if(typeof property == "object" && property !== null){
// 				equal = deepEqual(obj[property], obj2[property]);
// 			}else{
// 				if ( obj1[property] !== obj2[property] ) equal = false;
// 			}
// 		}
// 	}

// 	return equal;
// }

var deepEqual = function(obj1, obj2){

	var equal = new Boolean(false);
	
	if(typeof obj1 == "object" && obj1 !== null){
		for(var property in obj1){
			if( obj1.hasOwnProperty(property) ){
				if(typeof obj1[property] == "objet" && obj1[property] !== null){
					if(deepEqual(obj1[property], obj2[property])){
						equal = true;
					}else{
						equal = false;
					}
				}else if( obj1[property] == obj2[property] ){
					equal = true;
				}
			}
		}
	}else if(obj1 == obj2){
		equal = true;
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
