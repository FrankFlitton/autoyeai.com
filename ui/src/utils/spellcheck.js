let speller = {
  nWords: {},
  letters:{}
};

// A function that trains the language model with the words in the supplied text.
// Multiple invocation of this function can extend the training of the model.
speller.train = function (text) {
	var word, m, r = /[a-z']+/g;
	text = text.toLowerCase();
	while ((m = r.exec(text))) {
		word = m[0];
		speller.nWords[word] = speller.nWords.hasOwnProperty(word) ? speller.nWords[word] + 1 : 1;
	}
};

// A function that returns the correction for the specified word.
speller.correct = function (word) {
	if (speller.nWords.hasOwnProperty(word)) return word;
	var candidates = {}, list = speller.edits(word);
	list.forEach(function (edit) {
		if (speller.nWords.hasOwnProperty(edit)) candidates[speller.nWords[edit]] = edit;
	});
	if (speller.countKeys(candidates) > 0) return candidates[speller.max(candidates)];
	list.forEach(function (edit) {
		speller.edits(edit).forEach(function (w) {
			if (speller.nWords.hasOwnProperty(w)) candidates[speller.nWords[w]] = w;
		});
	});
	return speller.countKeys(candidates) > 0 ? candidates[speller.max(candidates)] : word;
};

// A map of words to the number of times they were encountered during training.
// This is exported only for the benefit of spelltest.js.
speller.nWords = speller.nWords = {};

// A helper function that counts the keys in the supplied object.
speller.countKeys = function (object) {
	var attr, count = 0;
	for (attr in object)
		if (object.hasOwnProperty(attr))
			count++;
	return count;
};

// A helper function that returns the word with the most occurences in the language
// model, among the supplied candidates.
speller.max = function (candidates) {
	var candidate, arr = [];
	for (candidate in candidates)
		if (candidates.hasOwnProperty(candidate))
			arr.push(candidate);
	return Math.max.apply(null, arr);
};

// eslint-disable-next-line
const letters = "abcdefghijklmnopqrstuvwxyz''".split("");

// A function that returns the set of possible corrections of the specified word.
// The edits can be deletions, insertions, alterations or transpositions.
speller.edits = function (word) {
	var i, results = [];
	// deletion
	for (i=0; i < word.length; i++)
	    results.push(word.slice(0, i) + word.slice(i+1));
	// transposition
	for (i=0; i < word.length-1; i++)
	    results.push(word.slice(0, i) + word.slice(i+1, i+2) + word.slice(i, i+1) + word.slice(i+2));
	// alteration
	for (i=0; i < word.length; i++)
			// eslint-disable-next-line
	    letters.forEach(function (l) {
	        results.push(word.slice(0, i) + l + word.slice(i+1));
		});
	// insertion
	for (i=0; i <= word.length; i++)
			// eslint-disable-next-line
	    letters.forEach(function (l) {
	        results.push(word.slice(0, i) + l + word.slice(i));
		});
	return results;
};

export default speller