var string = `searchengine=http://www.google.com/search?q=$1
spitefulness=9.7

; comments are preceded by a semicolon...
; each section concerns an individual enemy
[larry]
fullname=Larry Doe
type=kindergarten bully
website=http://www.geocities.com/CapeCanaveral/11451

[gargamel]
fullname=Gargamel
type=evil sorcerer
outputdir=/home/marijn/enemies/gargamel`;

function parseINI(string) {
	// Start with an objet to hold the top-level fields
	var currentSection = {name: null, fields: []};
	var categories = [currentSection];

	string.split(/\r?\n/).forEach(function(line){
		var match;
		if (/^\s*(;.*)?$/.test(line)) {
			return;
		}else if (match = line.match(/^\[(.*)\]$/)){
			currentSection = {name: match[1], fields: []};
			categories.push(currentSection);
		}else if (match = line.match(/^(\w+)=(.*)$/)){
			currentSection.fields.push({name: match[1], value: match[2]});
		}else{
			throw new Error("Line '" + line + "' is invalid.");
		}
	});

	return categories;
}