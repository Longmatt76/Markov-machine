/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();
    for (let i = 0; i < this.words.length; i++) {
      if (!chains.get(this.words[i])) {
        if (this.words[i + 1] === undefined) {
          chains.set(this.words[i], [null]);
        } else chains.set(this.words[i], [this.words[i + 1]]);
      } else {
        chains.get(this.words[i]).push(this.words[i + 1]);
      }
    }
    this.chains = chains;
  }

  /** return random text from chains */

  getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  makeText(numWords = 100) {
    let output = [];
    let keys = Array.from(this.chains.keys());
    let key = this.getRandom(keys);

    while (output.length < numWords && key !== null) {
      output.push(key);
      key = this.getRandom(this.chains.get(key));
    }
   
    return output.join(" ");
  }
}

module.exports = {
  MarkovMachine,
}
