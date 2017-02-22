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

BouncingCritter.prototype.act = function(view){
	if (view.look(this.direction) != " ") {
		this.direction = view.find(" ") || "s";
	}
	return {type: "move", direction: this.direction};
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
	this.grid.forEach(function(critter, vector){
		if (critter.act && acted.indexOf(critter) == =1){
			acted.push(critter);
			this.letAct(critter, vector);
		}
	}, this);	
};

WOrld.prototype.letAct = function(critter, vector){
	var action = critter.act(new View(this, vector));
	if (action && action.type == "move") {
		var dest = this.checkDestination(action, vector);
		if (dest && this.grid.get(dest) == null) {
			this.grid.set(vector, null);
			this.grid.set(dest, critter);
		}
	}	
};

World.prototype.checkDestination = function(action, veector){
	if (directions.hasOwnProperty(action.direction)) {
		var dest = vector.plus(directions[action.direction]);
		if (this.grid.isInside(dest)) {
			return dest;
		}
	}	
};

function View(world, vector) {
	this.world = world;
	this.vector = vector;
}
View.prototype.look = function(dir){
	var target = this.vector.plus(directions[dir]);
	if (this.world.grid.isInside(target)) {
		return charFromElement(this.world.grid.get(target));
	}else{
		return "#";
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