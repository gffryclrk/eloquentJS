//  I wrote my original solution to this problem yesterday when I wasn't very familiar with the question. I'm not sure that I yet understand the task.
//  My first understanding of the problem was to design something analagous to .forEach which I did in my previous solution.
//  However, after glancing at some discussion about this exercise and reading some of the author's solution I'm not entirely sure that's what he was looking for.
//  Presently I think he might be looking for an iteratable object similar to what has been implemented in the Ruby programming language (a language all of this OO JS makes me dearly miss.)

function ArraySeq(array) {
	this.sequence = array.slice(); //Duplicate input array.
	this.iteration = 0; //current counter position
}
ArraySeq.prototype.next = function(){
	if (this.iteration >= this.sequence.length - 1) { return null; }
	this.iteration += 1;
	return this.sequence[this.iteration];
} 
ArraySeq.prototype.current = function(){
	return this.sequence[this.iteration]	
}
function RangeSeq(from, to) {
 	var range = [];
 	for (var i = from; i <= to; i+= 1){
 		range.push(i);
 	}
 	ArraySeq.call(this, range);
 } 
 RangeSeq.prototype = Object.create(ArraySeq.prototype);

 function logFive(seqObj){
 	console.log(seqObj.current());
 	for (var i = 0; i <= 3; i+= 1){
 		// var next = seqObj.next();
	 	var current = seqObj.iteration; //I incorporated this current variable to continue iteration in the event that sequence object contains null. 
 		seqObj.next();
 		if ( seqObj.iteration > current ) { 
 			console.log(seqObj.current()); 
 		} else { 
 			break;
 		}
 		// console.log(seqObj.next());
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