'use strict'
// var sys = require('sys');
const fs = require('fs')

// actual conversion code starts here
function words_in_a_file(filename, limit) {
  let array = filename
  let counts = {}

  for(let i=0; i<array.length; i++){
    counts[array[i]] = (counts[array[i]] + 1) || 1;
  }

  let destroy = ["the", "a", "and", "of", "in", "to", "at", "on", "but", "is", "as"]

  destroy.map((element)=>{
    delete counts[element]
  })

  let keySorted = Object.keys(counts).sort((a,b)=>{
    return counts[b]-counts[a]
  })
  // console.log(keySorted[0]);
  for(let i=0; i<limit; i++){
    console.log(`${keySorted[i]} : ${counts[keySorted[i]]}`);
  }
}

let data = fs.readFileSync('source.txt').toString()
let patt = /[a-z]+/gi

let filename = data.match(patt).map((value)=>{
  return value.toLowerCase()
})

// console.log(filename);

words_in_a_file(filename, 3)

module.exports = {
  words_in_a_file: words_in_a_file
}
