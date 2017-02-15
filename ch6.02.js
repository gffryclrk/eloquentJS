//This was my original solution. I wasn't sure of the best way to use the data and re-used a bunch of the code from the text-book.
//After looking at the Author's solution I better understand how using inheritance is a better way to re-use code.
//For example; where I re-wrote the draw function I could have simply referenced the inner object's draw function (as in solution)
//Also, I could have simplified my code quite a lot. 

function StretchCell(inner, width, height) {
	TextCell.call(this, inner.text.toString());
	this.width = width;
	this.height = height;
}
StretchCell.prototype = Object.create(TextCell.prototype);
StretchCell.prototype.draw = function(width, height) {
	var result = [];
	for (var i = 0; i < height; i+= 1){
		var line = this.text[i] || "";
		result.push(repeat(" ", width - line.length) + line);
	}
	return result;
}
StretchCell.prototype.minHeight = function(){
	return this.height;	
} 

var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// → ["abc", "   "]
