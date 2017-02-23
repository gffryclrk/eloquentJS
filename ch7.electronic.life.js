// Working through Chapter 7 Project Code
// http://eloquentjavascript.net/07_elife.html
// Begin: Friday, February 17th, 2017

var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];

function Vector(x, y) {
	this.x = x;
	this.y = y;
}
Vector.prototype.plus = function(other){
	return new Vector(this.x + other.x, this.y + other.y);	
};

function Grid(width, height) {
	this.space = new Array(width * height);
	this.width = width;
	this.height = height;
}
Grid.prototype.inInside = function(vector){
	return vector.x >= 0 && vector.x < this.width && vector.y >= 0 && vector.y < this.height;
};
Grid.prototype.get = function(vector){
	return this.space[vector.x + this.width * vector.y];
};
Grid.prototype.set = function(vector, value){
	this.space[vector.x + this.width * vector.y] = value;	
};

var directions = {
	"n": new Vector(0, -1),
	"ne": new Vector(1, -1),
	"e": new Vector(1,0),
	"se": new Vector(1,1),
	"s": new Vector(0,1),
	"sw": new Vector(-1,1),
	"w": new Vector(-1,0),
	"nw": new Vector(-1,-1)
};
function randomElement(array) {
	return array[Math.floor(Math.random() * array.length)];
}

var directionNames = "n ne e se s sw w nw".split(" ");

function BouncingCritter() {
	this.direction = randomElement(directionNames);
};

BouncingCritter.prototype.act = function(view){ //act method accepts view object and paasses this object a direction variable (created from randomized selection of all possible directions)
	if (view.look(this.direction) != " ") { //if random direction is not empty space (why? can only move into empty space), 
		this.direction = view.find(" ") || "s";  //find empty space or else set direction = south
	}
	return {type: "move", direction: this.direction}; //return object
};

// The World Object

function elementFromChar(legend, ch) { //example legend: {"#": Wall, "o": BouncingCritter}. Receives legend and line
	if (ch == " "){
		return null;
	}
	var element = new legend[ch]();
	element.originChar = ch;
	return element;
}

function World(map, legend) { //example in book initializes world = new World(plan, {"#": Wall, "o": BouncingCritter});
	var grid = new Grid(map[0].length, map.length); //creates empty array with x * y available spaces
	this.grid = grid;
	this.legend = legend; //takes legend passed from initialization; Example above (line 70)

	map.forEach(function(line, y){ //map = plan array above
		for (var x = 0; x < line.length; x+= 1){ //goes through each index in array and sets element = plan value "#", " ", or "o"
			grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
		}
	});
}

function charFromElement(element) {
	if (element == null) {
		return " ";
	}else{
		return element.originChar;
	}
}

World.prototype.toString = function() {
	var output = "";
	for (var y = 0; y < this.grid.height; y+= 1){
		for (var x = 0; x < this.grid.width; x+= 1){
			var element = this.grid.get(new Vector(x, y));
			output += charFromElement(element);
		}
		output += "\n";
	}
	return output;
};

function Wall() {}

var world = new World(plan, {"#": Wall, "o": BouncingCritter});

// This and Its Scope

Grid.prototype.forEach = function(f, context){
	for (var y = 0; y < this.height; y+= 1){
			for (var x = 0; x < this.width; x+= 1){
				var value = this.space[x + y * this.width];
				if (value != null) {
					f.call(context, value, new Vector(x, y));
				}
			}
		}	
};

// Animating Life

World.prototype.turn = function(){
	var acted  = [];
	this.grid.forEach(function(critter, vector){ //this.grid = plan array 
		if (critter.act && acted.indexOf(critter) == =1){ //iterates over entire array looking for element objects with act method. Executes when found
			acted.push(critter);
			this.letAct(critter, vector); //vector passed is obtained from forEach function: Nested loops go through entire array searching for non null elements.
			// when element (object) is found the forEach function calls the provided function (beginning line 132) with three arguments: context, value and new Vector(x,y) (line 121).
			// The function called in this case accepts value (critter) and vector (new Vector(x, y)). This is only called on element objects with an act method which are not part of the acted array (line 133).
		}
	}, this);	
};

World.prototype.letAct = function(critter, vector){  //who is acting and where? Whom: Object, where: Vector
	var action = critter.act(new View(this, vector)); //initializes new View object using this object as world. The vector is the current coordinates of the object. 
	if (action && action.type == "move") {  //BouncingCritter has only one action: move, Act method accepts object (instance of BouncingCritter) and vector (current location)
		// the critter object's act method essentailly chooses a random empty space " " from squares adjacent to itself and chooses that as a destination.
		var dest = this.checkDestination(action, vector);
		if (dest && this.grid.get(dest) == null) {
			this.grid.set(vector, null);
			this.grid.set(dest, critter);
		}
	}	
};

World.prototype.checkDestination = function(action, vector){
	if (directions.hasOwnProperty(action.direction)) { //verifies that direction passed is, infact, a valid direction (property of directions array)
		var dest = vector.plus(directions[action.direction]); //creates destination vector by passing supplied vector (critter's location in letAct method) to addition method.
		// vector.plus method then adds directional vector (i.e n = (0, -1) to current location vector
		if (this.grid.isInside(dest)) {
			return dest; //returns destination vector as long as destination vector is within grid dimensions (x <= width, y <= height)
		}
	}	
};

function View(world, vector) { //this view object represents what is in the proximity of other objects. I.E checks adjacent locations using methods.
	this.world = world;
	this.vector = vector;
}
View.prototype.look = function(dir){ //look method accepts direction variable (string: "n", "ne" etc) 
	var target = this.vector.plus(directions[dir]); //adds vector equivalent of dir string (ie. n = 0,-1) to get vector of new location
	if (this.world.grid.isInside(target)) { //if the target vector is inside the "world", i.e x <= width && y <= height it returns the object currently in that space
		return charFromElement(this.world.grid.get(target));
	}else{
		return "#"; //otherwise returns "#" which is an empty Wall object. 
	}
};
View.prototype.findAll = function(ch){
	var found = [];	
	for (var dir in directions){
		if (this.look(dir) == ch) {
			found.push(dir);
		}
	}
	return found;
};
View.prototype.find = function(ch){
	var found = this.findAll(ch);
	if (found.length == 0) {
		return null;
	}
	return randomElement(found)	;
};