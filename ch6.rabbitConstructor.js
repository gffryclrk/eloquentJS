function Rabbit(type){
	this.type = type;
}

var killerRabbit = new Rabbit("killer");
var blackRabbit = new Rabbit("black");

Rabbit.prototype.speak = function (line) {
	console.log("The " + this.type + " rabbit says '" + line + "'" );
};
// blackRabbit.speak("Doom...");

// Prototype Interference

Rabbit.prototype.dance = function() {
	console.log("The " + this.type + " rabbit dances a jig.");
};
killerRabbit.dance();