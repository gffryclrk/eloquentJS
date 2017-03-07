var name = "harry";
var text = "Harry is a suspicious character";
var regexp = new RegExp("\\b(" + name + ")\\b", "gi");
console.log(text.replace(regexp, "_$1_"));