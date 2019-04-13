//a module to ingest text and filter/parse it per-sentence down to required Pos-tags
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

"use strict";
const debug = require('debug')('nlp');
const pos = require('pos');
const tags = process.env.POS_TAGS.split(',');
const illegal_words = process.env.ILLEGAL_WORDS.split(',');

module.exports = {

  // input a story (series of phrases) => return POS across the whole story
  parse_nouns: function(input_text) {
    return new Promise(function(resolve, reject) {
      let uniqueArray = [];
      let text = input_text.toLowerCase();
      debug(text);
      // process input text into words
      let words = new pos.Lexer().lex(text);
      debug(words);
      // filter-out illegal words
      let legal_words = words.filter(e => !illegal_words.includes(e));
      debug(legal_words);
      // populate an array with key:values for tag:word
      let tagger = new pos.Tagger();
      let taggedWords = tagger.tag(legal_words);
      debug(taggedWords)
      // setup empty arrays to store parsed... index_in_story:word
      let output_indexes = [];
      let output_words = [];
      let i;
      for (i = 0; i < taggedWords.length; i++) {
        let taggedWord = taggedWords[i];
        let word = taggedWord[0];
        let tag = taggedWord[1];
        //debug_module_parse('Word:' + word + ' - Tag:' + tag)
        for (let z of tags) {
          if (tag == z) {
            debug(tag + ':' + word);
            output_indexes.push(i);
            output_words.push(word);
          }
        }
      }
      debug(output_indexes)
      debug(output_words)
      // combine compound-nouns
      let output_word = [];
      output_word.push(output_words[0]);
      for (i = 1; i < output_indexes.length; i++) {
        if (output_indexes[i - 1] + 1 == output_indexes[i]) {
          output_word[output_word.length - 1] = output_word[output_word.length - 1] + "-" + output_words[i];
        } else {
          output_word.push(output_words[i]);
        }
      }
      for (i = 0; i < output_word.length; i++) {
        debug('Compounded-Output: ' + output_word[i]);
      }
      // the returned array of unique nouns extraced from the pos:tagger
      uniqueArray = output_word.filter(function(item, pos) {
        return output_word.indexOf(item) == pos;
      });
      // test to determine Promise-Fullfilment
      if (Array.isArray(uniqueArray)) {
        debug(uniqueArray);
        resolve(uniqueArray);
      } else {
        reject(Error("did not parse an array"));
      }
    }).catch((err) => {
      debug("Err: ", err);
    });
  },

  // input a story (series of phrases) => split story into phrases => return POS's per phrase
  parse_phrases: function(input_text) {
    return new Promise(function(resolve, reject) {
      let parsed_sentence_array = []
      // data input... text
      let text = input_text
      debug("Input text: " + text)
      // handle un-finished ends on the input-string
      let lastChar = text.charAt(text.length - 1)
      if (lastChar === " ") {
        text = text.substring(0, text.length - 1)
      }
      if (lastChar !== "." || lastChar !== "!" || lastChar !== "?") {
        text = text + "."
      }
      // split into phrases via a REGEX arguement
      let sentence_array = text.match(/\(?[^\.\?\!]+[\.!\?]\)?/g)
      //let sentence_array = text.split(".")
      for (let value of sentence_array) {
        value = value.trim()
        debug('sentence_array: ' + value)
      }
      // parse according to pos-tags ["NN", "NNP", "NNPS", "NNS", "VB", "VBD", "VBG", "VBN", "VBP", "VBZ"]
      for (let values of sentence_array) {
        let shorter_sentence = ""
        let words = new pos.Lexer().lex(values);
        let tagger = new pos.Tagger()
        let taggedWords = tagger.tag(words);
        for (let units of taggedWords) {
          let taggedWord = units
          let word = taggedWord[0]
          let tag = taggedWord[1]
          for (let z of tags) {
            if (tag == z) {
              shorter_sentence = shorter_sentence.concat(" " + word)
            }
          }
        }
        shorter_sentence = shorter_sentence.trim()
        parsed_sentence_array.push(shorter_sentence)
      }
      for (let value of parsed_sentence_array) {
        debug("Parsed sentence array entry: " + value)
      }
      // test to determine Promise-Fullfilment
      if (Array.isArray(parsed_sentence_array)) {
        debug('done')
        debug(parsed_sentence_array);
        resolve(parsed_sentence_array);
      } else {
        reject("did not parse an array");
      }
    });
  }
}
