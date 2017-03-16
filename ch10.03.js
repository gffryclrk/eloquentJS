function require(name) {
	if (name in require.cache) {
		return require.cache[name];
	}

	var code = new Function("exports, module", readFile(name));
	var exports = {}, module = {exports: exports};
	code(exports, module);

	require.cache[name] = module.exports;
	return module.exports;
}
require.cache = Object.create(null);

// I'm sort of guessing that to allow circular modules (Modules which require each other) you would have to check the cache against the export object.
// When loading a module for a dependency the require function checks the cache. So when A loads, it caches itself, when B loads and tries to load A it
// checks the cache. Is this functionality not already implemented with the if statement on line 2? Perhaps not because A hasn't cached itself yet. 
// Perhaps by changing the order of operations and caching the exports object before executing the code: move line 10, require.cache[name] = module.exports to
// happen before code(exports, module) on line 8. This might work or perhaps not depending on hoisting. 