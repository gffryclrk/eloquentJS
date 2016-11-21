//deep comparison

/*var deepEqual = function(val1, val2){
	//var result = false;
	if (val1 != null && val2 != null){
		if(typeof val1 == 'object' && typeof val2 == 'object'){
			for (var key in val1){
				if (val2[key]) {
					deepEqual(val1[key], val2[key]);
				}
			}
		}else{
			if (val1 === val2){
				return true;
			}else{
				return false;
			}
		}
	}
} */

var deepEqual = function(val1, val2){
	if(typeof val1 == 'object' && val1 != null){
		for (var key in val1){
			if(val2[key]){
				if(typeof val2[key] == 'object'){
					deepEqual(val1[key], val2[key])
				}else{
					if(val1[key] === val2[key]){
						return true;
					}else{
						return false;
					}
				}

			}else{
				return false;
			}
		}
	}
}
