// The Locked Box

var box = {
	locked: true,
	unlock: function(){ this.locked = false; },
	lock: function() { this.locked = true; },
	_content: [],
	get content() {
		if (this.locked) throw new Error("Locked!");
		return this._content;
	}
};

function withBoxUnlocked(body) {
	// Me code..
	// The author's solution is much more concise. The method is very similar only he uses return statements on hos body call (line 24) to greatly reduce if statements.
	// It's quite beautiful, really. 

	var locked = box.locked;
	try{
		if (box.locked) {
			box.unlock();
			withBoxUnlocked(body);
		} else {
			body();
			box.lock;
		}
	}finally{
		if(locked) box.lock();
	}
}

withBoxUnlocked(function(){
	box.content.push("gold piece");
});

try {
	withBoxUnlocked(function(){
		throw new Error("Pirates on the horizon! Abort!");
	});
} catch (e) {
	console.log("Error raised:", e);
}

console.log(box.locked);