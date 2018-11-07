//a module to ingest text and filter/parse it per-sentence down to required Pos-tags
const debug = require('debug')('nlp_module')

module.exports = {

  parse_nouns: function(input_text) {
    return new Promise(function(resolve, reject){
            //let debug_module_parse = require('debug')('module_parse');
      let uniqueArray = [];
      // data in... tags eg. ["NN", "NNP", "NNPS", "NNS", "VB", "VBD", "VBG", "VBN", "VBP", "VBZ"]
      const tags = ["NN", "NNP", "NNPS", "NNS"];
      let text = input_text
      debug(text)
      // simple NLP pos-tagger
      const pos = require('pos');
      let tagger = new pos.Tagger();
      //process input text
      let words = new pos.Lexer().lex(text);
      //populate an array with key:values for postag:word
      let taggedWords = tagger.tag(words);
      // setup empty arrays to store parsed... index_in_story:word
      let output_indexes = [];
      let output_words = [];
      for (i = 0; i < taggedWords.length; i++) {
        let taggedWord = taggedWords[i];
        let word = taggedWord[0];
        let tag = taggedWord[1];
        //debug_module_parse('Word:' + word + ' - Tag:' + tag)
        for (let z of tags) {
          if (tag == z) {
            debug(tag + ':' + word)
            output_indexes.push(i);
            output_words.push(word);
          }
        }
      }
      //
      //combine compound-nouns
      let output_word = [];
      output_word.push(output_words[0])
      for (i = 1; i < output_indexes.length; i++) {
        if (output_indexes[i - 1] + 1 == output_indexes[i]) {
          output_word[output_word.length - 1] = output_word[output_word.length - 1] + "-" + output_words[i]
        } else {
          output_word.push(output_words[i])
        }
      }
      for (i = 0; i < output_word.length; i++) {
        debug('Compounded-Output: ' + output_word[i])
      }
      //the returned array of unique nouns extraced from the pos:tagger
      uniqueArray = output_word.filter(function(item, pos) {
        return output_word.indexOf(item) == pos;
      })
      //test to determine Promise-Fullfilment
      if (Array.isArray(uniqueArray)) {
        debug(uniqueArray)
        resolve(uniqueArray)
      } else {
        reject(Error("did not parse a noun array"))
      }
    })
  },

  parse_phrases: function(input_text) {

    //let debug_module_parse = require('debug')('module_parse')

    let parsed_sentence_array = []

    // data input... text
    let text = input_text
    debug_module_parse("Input text: " + text)

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
      debug_module_parse('sentence_array: ' + value)
    }

    // parse according to pos-tags ["NN", "NNP", "NNPS", "NNS", "VB", "VBD", "VBG", "VBN", "VBP", "VBZ"]
    const pos = require('pos');
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
      debug_module_parse("Parsed sentences: " + value)
    }
    return parsed_sentence_array
  }

};

/*
NN    Noun, sing. or mass      dog
NNP   Proper noun, sing.      Edinburgh
NNPS  Proper noun, plural    Smiths
NNS   Noun, plural            dogs
VB   verb, base form          eat
VBD  verb, past tense        ate
VBG  verb, gerund            eating
VBN  verb, past part         eaten
VBP  Verb, present           eat
VBZ  Verb, present           eats
*/
