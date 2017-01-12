//accidentally saw the answer on MDN while looking up info on reduce function

var arrays = [[1,2,3], [4,5], [6]];

flatArray = arrays.reduce(function(a, b){
	return a.concat(b);
});
