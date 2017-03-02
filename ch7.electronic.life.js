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
Grid.prototype.isInside = function(vector){
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

function charFromElement(element) { //accepts element as argument (value of World array at specific location index). 
	if (element == null) {
		return " ";
	}else{
		return element.originChar; //originChar value contained within object at element index when set.
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
		if (critter.act && acted.indexOf(critter) == -1){ //iterates over entire array looking for element objects with act method. Executes when found
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
View.prototype.look = function(dir){ //look method accepts direction variable (string: "n", "ne" etc) which is converted into vector equivalent
	var target = this.vector.plus(directions[dir]); //adds vector equivalent of dir string (ie. n = 0,-1) to get vector of new location
	if (this.world.grid.isInside(target)) { //if the target vector is inside the "world", i.e x <= width && y <= height it returns the object currently in that space
		return charFromElement(this.world.grid.get(target)); //calls charFromElement function and passes the element value at target x,y (vector calculated using .plus method, array index obtained within .get). 
	}else{
		return "#"; //otherwise returns "#" which is the Wall object. 
	}
};
View.prototype.findAll = function(ch){
	var found = [];	
	for (var dir in directions){ //for each direction in direction set (n, nw, etc)
		if (this.look(dir) == ch) { //calls the look method on each possible direction. If look returns value that is being "looked for" it is added to found array.
			found.push(dir);
		}
	}
	return found; //returns array of all directions that have adjacent square containing character which was passed to method
};
View.prototype.find = function(ch){ //find function accepts string
	var found = this.findAll(ch); //calls findAll method with string argument passed
	if (found.length == 0) {
		return null;
	}
	return randomElement(found); //if findAll method returns array containing found string characters return the array. Otherwise return null. 
};

// It Moves

// Commented out so that it doesn't print out a bunch of big chunks to console.
// for (var i = 0; i < 5; i+= 1){
// 	world.turn();
// 	console.log(world.toString());
// }

// More life forms

function dirPlus(dir, n) { // direction is current direction wheras n is multiples of 45 degrees clockwise. i.e 2 * n = 90 degrees clockwise
	var index = directionNames.indexOf(dir); // var directionNames = "n ne e se s sw w nw".split(" ");
	return directionNames[(index + n + 8) % 8]; // adds index of current direction passed as argument to number of 45 degree clockwise rotations. 
	// Adds total quantity of possible clockwise rotations (8) and divides by 8. so North, (0), with a 90 degree clockwise rotation (2)
	// added to total amount of degrees (360/45 = 8) and gets remainder. (0 + 2 + 8) / 8 = 10 / 8 = 1r2. r = 2, e. 
}

function WallFollower() {
	this.dir = "s";
}

WallFollower.prototype.act = function(view){ //accepts view object
	// This critter's act prototype was a bit for me to wrap my head around.
	// The first difficulty I had was with the modulus math contained within dirPlus which eventually I was able to get my head around (thanks to Khan Academy).
	// The next was how the directional array converts to the 2d grid with directions. I was able to do this by working it all out on paper with examples.
	// Essentially the critter heads forward until the space in front of him isn't empty. He then looks for an empty space by searching clockwise (the while loop).
	// 
	// The if(view.look(dirPlus(this.dir, -3)) !== " ") conditional below checks to see that the critter just came from a wall and he isn't just floating in space.
	// Although this is explained in the text I didn't fully understand how it worked. Essentially the if statement checks to see that he is moving from a space
	// adjacent to a space that contains something ( a wall or another critter). This is obtained by checking the square of the space -3 directions. So if he is heading 
	// SOUTH, 3 spaces counter clockwise will be the square NORTH EAST of where he is prior to the move. 
	// In the case that an object is found ( != " " ) this.dir is set to -2. If he can move in that direction he will, otherwise the while loop immediately starts spinning
	// him in the other direction (clockwise).
	
	var start = this.dir; // "s"
	if (view.look(dirPlus(this.dir, -3)) != " ") { 
		start = this.dir = dirPlus(this.dir, -2);	
		
	}
	// The loop below facilitates the critter's search for an empty square when he encounters the square that he is travelling to is occupied. 
	// If he does a full 360 degree spin and doesn't find anything the loop exists and he tries to move in his direction.
	// He might not be able to do this if he is blocked into a corner or something but I guess he tries anyway (and is denied by the letAct method)
	while (view.look(this.dir) != " "){
		this.dir = dirPlus(this.dir, 1);
		if (this.dir == start) { break; }
	}
	return {type: "move", direction: this.dir};
};

// A More Lifelike Simulation

function LifelikeWorld(map, legend) {
	World.call(this, map, legend);
}
LifelikeWorld.prototype = Object.create(World.prototype);

var actionTypes = Object.create(null);

LifelikeWorld.prototype.letAct = function(critter, vector) {
	var action = critter.act(new View(this, vector));
	var handled = action &&
		action.type in actionTypes &&
		actionTypes[action.type].call(this, critter, vector, action);

	if(!handled) {
		critter.energy -= 0.2;
		if(critter.energy <= 0){
			this.grid.set(vector, null);
		}

	}
};

// Action Handlers

actionTypes.grow = function(critter){
	critter.energy += 0.5;
	return true;	
};

actionTypes.move = function(critter, vector, action){
	var dest = this.checkDestination(action, vector);
	if (dest == null || critter.energy <= 1 || this.grid.get(dest) != null) {
		return false;
	}
	critter.energy -= 1;
	this.grid.set(vector, null);
	this.grid.set(dest, critter);
	return true;
};

actionTypes.eat = function(critter, vector, action){
	var dest = this.checkDestination(action, vector);	
	var atDest = dest != null && this.grid.get(dest);
	if(!atDest || atDest.energy == null){
		return false;
	}
	critter.energy += atDest.energy;
	this.grid.set(dest, null);
	return true;
};

actionTypes.reproduce = function(critter, vector, action) {
	var baby = elementFromChar(this.legend, critter.originChar);
	var dest = this.checkDestination(action, vector);
	if(dest == null || critter.energy <= 2 * baby.energy || this.grid.get(dest) != null){
		return false;
	}
	critter.energy -= 2 * baby.energy;
	this.grid.set(dest, baby);
	return true;
};

// Populating the New World

function Plant() {
	this.energy = 3 + Math.random() * 4;
}
Plant.prototype.act = function(view){
	if (this.energy > 15) {
		var space = view.find(" ");
		if (space) {
			return {type: "reproduce", direction: space};
		}		
	}
	if (this.energy < 20) {
		return {type: "grow"};
	}
};

function PlantEater() {
 	this.energy = 20;
 } 
 PlantEater.prototype.act = function(view){
 	var space = view.find(" ");	
 	if (this.energy > 60 && space) {
 		return {type: "reproduce", direction: space};
 	}
 	var plant = view.find("*");
 	if (plant) {
 		return {type: "eat", direction: plant};
 	}
 	if (space) {
 		return {type: "move", direction: space};
 	}
 };

// Bringing it to Life

// Artificial Stupidity

function SmartPlantEater() {
	// I'm initializing this smarter herbivore by having him head in a straight line (as opposed to randomly stumbling about)
	this.energy = 20; 
	this.direction = randomElement(directionNames);
}
SmartPlantEater.prototype.act = function(view){
	var space = view.find(" ");
	if(this.energy > 80 && space){
		return {type: "reproduce", direction: space};
	}
	var plants = view.findAll("*");
	if(plants.length > 1){
		return {type: "eat", direction: randomElement(plants)};
	}
	if(view.look(this.direction) == " "){
		return {type: "move", direction: this.direction};
	}else{
		this.direction = view.find(" ");
	}
};

function Tiger() {
	this.energy = 100;
	this.direction = randomElement(directionNames);
	this.memory = [];
}
Tiger.prototype.act = function(view){
	var space = view.find(" ");
	this.memory.push(view.findAll("O").length);
	if (this.memory.length > 3) {
		this.memory.shift();
	}
	var foodSupply = this.memory.reduce(function(a,b){
		return a + b;
	}, 0);
	// console.log(foodSupply);
	if(this.energy > 200 && space){
		return {type: "reproduce", direction: space};
	}
	food = view.find("O");
	if (food && foodSupply > 2) {
		return {type: "eat", direction: food };
	}
	if(view.look(this.direction) == " "){
		return {type: "move", direction: this.direction};
	}else{
		if (food) {
			this.direction = food;
		}else{
			this.direction = dirPlus(this.direction, 1);			
		}
		// this.direction = space;
		// console.log(this.direction);
	}
};
