function parseExpression(program) {
	program = skipSpace(program); //program(1) = +(a, 10) 
									// program(2) = a, 10)
									// program(3) = 10)
	var match, expr;
	if (match = /^"([^"]*)"/.exec(program)) {
		expr = {type: "value", value: match[1]}; 
	}else if (match = /^\d+\b/.exec(program)) {
		expr = {type: "value", value: Number(match[0])}; //expr(3) = {type: "value", value: 10}
	}else if (match = /^[^\s(),"]+/.exec(program)){
		expr = {type: "word", name: match[0]}; //expr(1) = {type: "word", name: "+"}
												// epxr(2) = {type: "word", name: "a"}
	}else{
		throw new SyntaxError("Unexpected syntax: " + program);
	}

	return parseApply(expr, program.slice(match[0].length));
	//return parseApply({type: "word", name: "+"}, "(a, 10)") //First return
	// return parseApply({type: "word", name: "a"}, ", 10)") //Second Return
	// return parseApply({type: "value", value: 10}, ")") //Third return
}

function skipSpace(string) {
	var first = string.search(/\S/);
	if (first == -1) {
		return "";
	}
	return string.slice(first);
}

function parseApply(expr, program) {
	program = skipSpace(program); //program(1) = (a, 10)
									
	if (program[0] != "(") {
		return {expr: expr, rest: program};
	}

	program = skipSpace(program.slice(1)); //program(1) = a, 10)
	expr = {type: "apply", operator: expr, args: []}; //expr(1) = {type: "apply", operator: {type: "word", name: "+"}, args: []}
	while (program[0] != ")"){
		var arg = parseExpression(program); //arg(1) = parseExpression("a, 10)")
											//arg(2) = parseExpression("10)")
		expr.args.push(arg.expr); // arg(1).expr = {type: "word", name: "a"}
								// arg(2).expr = {type: "value", value: 10}
		program = skipSpace(arg.rest);
		if (program[0] == ",") {
			program = skipSpace(program.slice(1)); //program(1) = "10)"
		}else if (program[0] != ")"){
			throw new SyntaxError("Expected ',' or ')'");
		}
	}
	return parseApply(expr, program.slice(1)); 
	// return parseApply({type: "apply", operator: {type: "word", name: "+"}, args: [{type: "word", name: "a"}, {type: "value", value: 10}]}, "") //first return

}

function parse(program) { //parse("+(a, 10)")
	var result = parseExpression(program); //parseExpression("+(a, 10)")
	if (skipSpace(result.rest).length > 0) {
		throw new SyntaxError("Unexpected text after program");
	}
	return result.expr;
}
