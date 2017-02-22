var test = {
	prop: 10,
	addPropTo: function(array) {
		return array.map(function(elt){
			return this.prop + elt;	
		}.bind(this));
	}
};

var test2 = {
	prop: 10,
	addPropTo: function(array) {
		return array.map(function(elt){
			return this.prop + elt;	
		}, this);
	}
};