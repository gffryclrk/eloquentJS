// Disclaimer: This was my first attempted solution to this exercise. 
// The code functions and outputs the desired result but I didn't interpret the problem the way that the author
// perhaps would have liked. After  further reading into the question I wrote another solution which I believe is closer to being correct (ch6.03.b.js).

function Sequence(sequence) {
	// this.sequence = sequence.map(function(seq){
	// 	return seq;	
	// } );
	this.sequence = sequence;
	// for ( var item in sequence){
	// 	return item;
	// }
}
Sequence.prototype.start = function(){ //This start() method is unnecessary and was written to test inheritance & iteration
	for ( var item in this.sequence ){
		// return this.sequence[item];
		console.log(this.sequence[item]);
	}
} 
function ArraySeq(sequence) {
	// this.sequence = sequence;
	Sequence.call(this, sequence);
}
ArraySeq.prototype = Object.create(Sequence.prototype);

function RangeSeq(from, to) {
	range = [];
	for (var i = from; i <= to; i+= 1){
		range.push(i);
	}
	Sequence.call(this, range);
}
RangeSeq.prototype = Object.create(Sequence.prototype);

function logFive(seqObj) {
	max = Math.min(4, seqObj.sequence.length - 1);
	for (var i = 0; i <= max; i+= 1){
		console.log(seqObj.sequence[i]);
	}
}

logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104