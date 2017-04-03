function evaluate(expr, env) {
	switch(expr.type){
		case "value":
			return expr.value;

		case "word":
			if(expr.name in env){
				return env[expr.name];
			}else{
				throw new ReferenceError("Undefined variable: " + expr.name);
			}

		case "apply":
			if (expr.operator.type == "word" && expr.operator.name in specialForms) {
				return specialForms[expr.operator.name](expr.args, env);
			}

			var op = evaluate(expr.operator, env);
			if (typeof op != "function") {
				throw new TypeError("Applying a non-function");
			}
			return op.apply(null, expr.args.map(function(arg){
				return evaluate(arg, env);
			}));
	}
}

var specialForms = Object.create(null);

specialForms["if"] = function(args, env) {
	if (args.length != 3) {
		throw new SyntaxError("Bad number of args to if");
	}

	if (evaluate(args[0], env) !== false) {
		return evaluate(args[1], env);
	}else{
		return evaluate(args[2], env);
	}
}