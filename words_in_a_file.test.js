const assert = require('assert')
const words_in_a_file = require('./words_in_a_file.js').words_in_a_file

describe('Words in a file', () => {

  it('words_in_a_file must count the most common words in a file', function (done) {
    assert.deepEqual(words_in_a_file('source.txt', 3), {
      and: 223,
      of: 336,
      the: 533
    })
    done()
  })
  it('most_common_words must respect the limiter', function (done) {
    assert.deepEqual(words_in_a_file('source.txt', 1), {
      the: 533
    })
    assert.deepEqual(words_in_a_file('source.txt', 2), {
      of: 336,
      the: 533
    })
    done()
  })
})
