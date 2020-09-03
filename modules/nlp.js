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
JJ    Adjective               ie. runs
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

const tags = global.gConfig.posTags;
const { illegalWords } = global.gConfig;

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
      const processedWords = [];
      const processedTags = [];
      // let i;
      for (let i = 0; i < taggedWords.length; i += 1) {
        const word = taggedWords[i][0];
        processedWords.push(word);
        const tag = taggedWords[i][1];
        processedTags.push(tag);
        // debug(`Word: ${word} - Tag: ${tag}`);
      }
      debug(processedWords);
      debug(processedTags);
      // combine consecutive-nouns
      const joinedWords = [];
      joinedWords.push(processedWords[0]);
      for (let i = 1; i < processedTags.length; i += 1) {
        if (processedTags[i - 1] === processedTags[i]) {
          joinedWords[joinedWords.length - 1] = `${joinedWords[joinedWords.length - 1]}-${processedWords[i]}`;
        } else {
          joinedWords.push(processedWords[i]);
        }
      }
      debug(joinedWords);
      // the returned array of unique nouns extraced from the pos:tagger
      uniqueArray = joinedWords.filter((item, position) => joinedWords.indexOf(item) === position);
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
        // parse according to pos-tags
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
