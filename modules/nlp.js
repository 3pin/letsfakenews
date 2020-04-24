// a module to ingest text and filter/parse it per-sentence down to required Pos-tags
/*
POS tags...
NN    Noun, sing. or mass     ie. dog
NNP   Proper noun, sing.      ie. Edinburgh
NNPS  Proper noun, plural     ie. Smiths
NNS   Noun, plural            ie. dogs
VB    verb, base form         ie. eat
VBD   verb, past tense        ie. ate
VBG   verb, gerund            ie. eating
VBN   verb, past part         ie. eaten
VBP   Verb, present           ie. eat
VBZ   Verb, present           ie. eats
Eg...
[ 'It', 'PRP' ],
[ 'is', 'VBZ' ],
[ 'time', 'NN' ],
[ 'for', 'IN' ],
[ 'the', 'DT' ],
[ 'Irish', 'JJ' ],
[ 'to', 'TO' ],
[ 'take', 'VB' ],
[ 'no', 'DT' ],
[ 'from', 'IN' ],
[ 'the', 'DT' ],
[ 'Scottish', 'NNP' ],
[ '.', '.' ],
[ 'They', 'PRP' ],
[ 'can', 'MD' ],
[ 'go', 'VB' ],
[ 'themselves', 'PRP' ],
*/


const debug = require('debug')('nlp');
const pos = require('pos');

const tags = global.config.pos_tags;
const illegalWords = global.config.illegal_words;

module.exports = {

  // input a story (series of phrases) => return POS across the whole story
  parse_nouns(inputText) {
    return new Promise(((resolve, reject) => {
      let uniqueArray = [];
      const text = inputText.toLowerCase();
      debug(text);
      // process input text into words
      const words = new pos.Lexer().lex(text);
      debug(words);
      // filter-out illegal words
      const legalWords = words.filter((e) => !illegalWords.includes(e));
      debug(legalWords);
      // populate an array with key:values for tag:word
      const tagger = new pos.Tagger();
      const taggedWords = tagger.tag(legalWords);
      debug(taggedWords);
      // setup empty arrays to store parsed... index_in_story:word
      const outputIndexes = [];
      const outputWords = [];
      let i;
      for (i = 0; i < taggedWords.length; i += 1) {
        const taggedWord = taggedWords[i];
        const word = taggedWord[0];
        const tag = taggedWord[1];
        // debug_module_parse('Word:' + word + ' - Tag:' + tag)
        tags.forEach((entry, index) => {
          if (tag === entry) {
            debug(`${tag}:${word}`);
            outputIndexes.push(index);
            outputWords.push(word);
          }
        })
      }
      debug(outputIndexes);
      debug(outputWords);
      // combine compound-nouns
      const outputWord = [];
      outputWord.push(outputWords[0]);
      for (i = 1; i < outputIndexes.length; i += 1) {
        if (outputIndexes[i - 1] + 1 === outputIndexes[i]) {
          outputWord[outputWord.length - 1] = `${outputWord[outputWord.length - 1]}-${outputWords[i]}`;
        } else {
          outputWord.push(outputWords[i]);
        }
      }
      for (i = 0; i < outputWord.length; i += 1) {
        debug(`Compounded-Output: ${outputWord[i]}`);
      }
      // the returned array of unique nouns extraced from the pos:tagger
      uniqueArray = outputWord.filter((item, position) => outputWord.indexOf(item) === position);
      // test to determine Promise-Fullfilment
      if (Array.isArray(uniqueArray)) {
        debug(uniqueArray);
        resolve(uniqueArray);
      } else {
        reject(Error('did not parse an array'));
      }
    })).catch((err) => {
      debug('Err: ', err);
    });
  },

  // input a story (series of phrases) => split story into phrases => return POS's per phrase
  parse_phrases(inputText) {
    return new Promise(((resolve, reject) => {
      const parsedSentenceArray = [];
      // data input... text
      let text = inputText;
      debug(`Input text: ${text}`);
      // handle un-finished ends on the input-string
      const lastChar = text.charAt(text.length - 1);
      if (lastChar === ' ') {
        text = text.substring(0, text.length - 1);
      }
      if (lastChar !== '.' || lastChar !== '!' || lastChar !== '?') {
        text += '.';
      }
      // split into phrases via a REGEX arguement
      // const sentenceArray = text.match(/\(?[^\.\?\!]+[\.!\?]\)?/g)
      const sentenceArray = text.match(/\(?[^.?!]+[.!?]\)?/g);
      // let sentenceArray = text.split(".")
      sentenceArray.forEach((value) => {
        value.trim()
        // parse according to pos-tags ["NN", "NNP", "NNPS", "NNS", "VB", "VBD", "VBG", "VBN", "VBP", "VBZ"]
        let shorterSentence = '';
        const words = new pos.Lexer().lex(value);
        const tagger = new pos.Tagger();
        const taggedWords = tagger.tag(words);
        taggedWords.forEach((unit) => {
          const taggedWord = unit;
          const word = taggedWord[0];
          const tag = taggedWord[1];
          tags.forEach((z) => {
            if (tag === z) {
              shorterSentence = shorterSentence.concat(` ${word}`);
            }
          })
        })
        shorterSentence = shorterSentence.trim();
        parsedSentenceArray.push(shorterSentence);
      })
      parsedSentenceArray.forEach((value) => debug(`Parsed sentence array entry: ${value}`))
      // test to determine Promise-Fullfilment
      if (Array.isArray(parsedSentenceArray)) {
        debug('done');
        debug(parsedSentenceArray);
        resolve(parsedSentenceArray);
      } else {
        reject(new Error('did not parse an array'));
      }
    }));
  },
};
