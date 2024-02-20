"use strict";

module.exports = compare;

function compare(word, guess) {


  word = word.toLowerCase();
  guess = guess.toLowerCase();
  const wordMap = {};
  const guessMap = {};

  function frequencyMap(term, map) {
    for (let char of term) {
      if (!map[char]) {
        map[char] = 1
      }
      else {
        map[char] = map[char] + 1
      }
    }
  }

  frequencyMap(word, wordMap);
  frequencyMap(guess, guessMap);

  let count = 0

  for (let [key] of Object.entries(wordMap)) {
    if (guessMap[key]) {
      count += wordMap[key] <= guessMap[key] ? wordMap[key] : guessMap[key];
    }
  }

  return count;
}
