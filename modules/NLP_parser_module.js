//a module to ingest text and filter/parse it per-sentence down to required Pos-tags

module.exports = {

  NLP_parse_words: function(input_text) {
    let debug_module_parse = require('debug')('module_parse');
    var uniqueArray = [];
    // data in... tags eg. ["NN", "NNP", "NNPS", "NNS", "VB", "VBD", "VBG", "VBN", "VBP", "VBZ"]
    var tags = ["NN", "NNP", "NNPS", "NNS"];
    var text = input_text
    //
    // simple NLP pos-tagger
    const pos = require('pos');
    var tagger = new pos.Tagger();
    //process input text
    var words = new pos.Lexer().lex(text);
    //populate an array with key:values for postag:word
    var taggedWords = tagger.tag(words);
    // setup empty arrays to store parsed... index_in_story:word
    var output_indexes = [];
    var output_words = [];
    for (i = 0; i < taggedWords.length; i++) {
      var taggedWord = taggedWords[i];
      var word = taggedWord[0];
      var tag = taggedWord[1];
      //debug_module_parse('Word:' + word + ' - Tag:' + tag)
      for (let z of tags) {
        if (tag == z) {
          debug_module_parse(tag + ':' + word)
          output_indexes.push(i);
          output_words.push(word);
        }
      }
    }
    //
    //combine compound-nouns
    var output_word = [];
    output_word.push(output_words[0])
    for (i = 1; i < output_indexes.length; i++) {
      if (output_indexes[i - 1] + 1 == output_indexes[i]) {
        output_word[output_word.length - 1] = output_word[output_word.length - 1] + "-" + output_words[i]
      } else {
        output_word.push(output_words[i])
      }
    }
    for (i = 0; i < output_word.length; i++) {
      debug_module_parse('Compounded-Output: ' + output_word[i])
    }
    //the returned array of unique nouns extraced from the pos:tagger
    var uniqueArray = output_word.filter(function(item, pos) {
      return output_word.indexOf(item) == pos;
    })
    return uniqueArray
  },

  NLP_parse_phrases: function(input_text) {

    let debug_module_parse = require('debug')('module_parse')

    var parsed_sentence_array = []

    // data input... text
    var text = input_text
    debug_module_parse("Input text: " + text)

    // handle un-finished ends on the input-string
    var lastChar = text.charAt(text.length - 1)
    if (lastChar === " ") {
      text = text.substring(0, text.length - 1)
    }
    if (lastChar !== "." || lastChar !== "!" || lastChar !== "?") {
      text = text + "."
    }

    // split into phrases via a REGEX arguement
    var sentence_array = text.match(/\(?[^\.\?\!]+[\.!\?]\)?/g)
    //var sentence_array = text.split(".")
    for (let value of sentence_array) {
      value = value.trim()
      debug_module_parse('sentence_array: ' + value)
    }

    // parse according to pos-tags ["NN", "NNP", "NNPS", "NNS", "VB", "VBD", "VBG", "VBN", "VBP", "VBZ"]
    var pos = require('pos');
    for (let values of sentence_array) {
      var shorter_sentence = ""
      var words = new pos.Lexer().lex(values);
      var tagger = new pos.Tagger()
      var taggedWords = tagger.tag(words);
      for (let units of taggedWords) {
        var taggedWord = units
        var word = taggedWord[0]
        var tag = taggedWord[1]
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
