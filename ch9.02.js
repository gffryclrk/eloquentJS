// Quoting Style
// Below is my solution. I suppose I made it more complicated than it needed to be.
// I was thinking of scenarios where text would contain apostrophies at the end of a word,
// such as in cases with plural possessive. ie. 'The actresses' dressing room.' 
// However, this wasn't stipulated in the problem and thus my over-complication. 


var text = "'I'm the cook,' he said, 'it's my job.'";

// '(\w+('.)?[,.:;]?\s?)+'

console.log(text.replace(/'(\w+('.)?[,.:;]?\s?)+'/g, function(str){
	return "\"" + str.slice(1, -1) + "\"";
}))