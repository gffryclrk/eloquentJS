//a^2 + b^2 = c^2

function Vector(x,y) {
	this.x = x;
	this.y = y;
}
Vector.prototype.plus = function(vector){
	return { x: this.x + vector["x"], y: this.y + vector["y"] };	
} 
Vector.prototype.minus = function(vector){
	return { x: this.x - vector["x"], y: this.y - vector["y"] };	
} 
Object.defineProperty(Vector.prototype, "length", {
	get: function() {
		return Math.hypot(this.x, this.y);
	}
})

console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);
// → 5