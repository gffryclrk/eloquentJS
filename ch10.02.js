// I Wasn't sure if, based on the question, we were supposed to actually re-organize all of Chapter 7's code or else simply
// write out how we would go about doing it. Based on the hint and the fact that there is no code solution I'm guessing the latter.
// Here's how I would organize the Electronic Life functions into Modules:

// Organisims
// -Plant
// -PlantEater
// -SmartPlantEater
// -Tiger
// -Bouncing Critter
// -WallFollower

// Universe
// -World
// -Grid
// -Wall

// Engine
// -Vector
// -directions
// -directionNames
// -randomElement
// -elementFromChar
// -charFromElement
// -dirPlus

// My logic is pretty much to divide funcationality from things that use the functionality. I think you could load multiple maps & obstacles with the Universe module,
// have interacting creatures and so forth all contained within some sort of Organisms module and then have all your business logic and functionality within the Engine module
// which is mostly helper functions. I think Vector could just as easily go in the Universe module. 
