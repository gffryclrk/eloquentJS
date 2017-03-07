// Regexp Golf




// Fill in the regular expressions

// 1. car and cat
verify(/ca[rt]/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

// 2. pop and prop
verify(/pr?op/,
       ["pop culture", "mad props"],
       ["plop"]);
// 3. ferret, ferry and ferrari
verify(/ferr(e|y|ari)/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);
// 4. Any word ending in ious
verify(/ious\b/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);
// 5. A whitespace character followed by a dot, comma, colon, or semicolon
// Solution doesn't include the \ within the []. For some reason I thought it was necessary to escape the dot (perhaps the second array element confused me).
verify(/\s[\.,:;]/,
       ["bad punctuation ."],
       ["escape the dot"]);
// 6. A word longer than 6 letters
verify(/\w{7,}/,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);

// 7. A word without the letter e
// The closest I got, without looking at the solution, is below.
// The solution is close: /\b[a-df-z]+\b/i
// I couldn't figure out, for the life of me, what was wrong. Even after viewing the solution it took me a minute:
// whitespace isn't an e character and so the space between the words was affecting how the test passes. 
// As usual, the answer is obvious after you've seen it. 
verify(/\b[^e]+\b/,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape"]);


function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  yes.forEach(function(s) {
    if (!regexp.test(s))
      console.log("Failure to match '" + s + "'");
  });
  no.forEach(function(s) {
    if (regexp.test(s))
      console.log("Unexpected match for '" + s + "'");
  });
}