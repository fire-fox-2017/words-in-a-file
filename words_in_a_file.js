var util = require('util');
const fs = require('fs')

// actual conversion code starts here
function words_in_a_file(filename, limit) {
  // Put all the text content into a string
  let fileContent = fs.readFileSync(filename).toString();
  // Put all words from the text into an array
  let words = fileContent.toLowerCase().match(/[a-z]+/gi);
  // Put all sentence from the text into an array
  let tregex = /[^\r\n.!?]+(:?(:?\r\n|[\r\n]|[.!?])+|$)/gi;
  let sentences = fileContent.toLowerCase().match(tregex);
  // List of ignored words
  let ignoreWords = ["the", "of", "and", "in", "to", "a", "is", "as", "with", "that"];
  // Put all unique words into an array
  let uniqueWords = [], wordFreq = [];
  for (let i = 0; i < words.length; i++) {
    if (ignoreWords.indexOf(words[i]) == -1) {
      if (uniqueWords.indexOf(words[i]) == -1) {
        uniqueWords.push(words[i]);
        wordFreq.push(1);
      } else {
        wordFreq[uniqueWords.indexOf(words[i])]++;
      }
    }
  }
  let wordSet = [];
  for (let i = 0; i < uniqueWords.length; i++) {
    wordSet.push([uniqueWords[i], wordFreq[i]]);
  }
  // Sort words based on frequency
  wordSet.sort((a, b) => {return b[1] - a[1]});
  console.log(`${limit} Most common words :`);
  for (let i = 0; i < limit; i++) {
    console.log(`'${wordSet[i][0]}': ${wordSet[i][1]} occurences`);
  }
  console.log(`\n${limit} Least common words :`);
  for (let i = 0; i < limit; i++) {
    console.log(`'${wordSet[wordSet.length - i - 1][0]}': ${wordSet[wordSet.length - i - 1][1]} occurences`);
  }
  // Sentences operations
  for (let i = 0; i < sentences.length; i++) {
    if (!/[a-z]+/gi.test(sentences[i])) {
      sentences.splice(i,1);
      i--;
    }
  }
  for (let i = 0; i < sentences.length; i++) {
    sentences[i] = sentences[i].match(/[a-z]+/gi);
  }
  sentences.sort((a, b) => {
    return b.length - a.length;
  })
  console.log(`\n${limit} Longest sentences :`);
  for (let i = 0; i < limit; i++) {
    console.log(`'${sentences[i].join(" ")}'\n ${sentences[i].length} words`);
  }

}

// To execute the program, we have to put the text file name after the program file name
if (process.argv.length < 3) {
  console.log('The right command line: node ' + process.argv[1].split("\\")[process.argv[1].split("\\").length - 1] + ' FILENAME');
  process.exit(1);
}

words_in_a_file(process.argv[2], 5);

module.exports = {
  words_in_a_file: words_in_a_file
}
