//a module to ingest text and filter/parse it per-sentence down to required Pos-tags

module.exports = {

  NLP_parse_words: function(input_text, pos) {

    let debug_module_parse = require('debug')('module_parse')
    var uniqueArray = [];

    // data in... tags eg. ["NN", "NNP", "NNPS", "NNS", "VB", "VBD", "VBG", "VBN", "VBP", "VBZ"]
    var tags = pos
    console.log('tags: ' + tags)
    var text = input_text;
    debug_module_parse("Input text to NLP_parse_words: " + text);

    // parse according to pos-tags
    var pos = require('pos');
    var parsed_word_array = [];
    var words = new pos.Lexer().lex(text);
    var tagger = new pos.Tagger();
    var taggedWords = tagger.tag(words);
    for (let value of taggedWords) {
      var taggedWord = value;
      var word = taggedWord[0];
      var tag = taggedWord[1];
      debug_module_parse('Word:' + word + ' - Tag:' + tag)
      for (let z of tags) {
        if (tag == z) {
          console.log(tag + ':' + word)
          parsed_word_array.push(word);
        }
      }
    }
    uniqueArray = parsed_word_array.filter(function(item, pos) {
      return parsed_word_array.indexOf(item) == pos;
    })
    for (let unique_word of uniqueArray) {
      debug_module_parse('unique_word: ' + unique_word);
    }
    return uniqueArray
  },

  NLP_parse_phrases: function(input_text) {

    let debug_module_parse = require('debug')('module_parse')

    var parsed_sentence_array = []

    // data input... text
    var text = input_text
    debug_module_parse("Input text: " + text)

    // handle un-finished ends on the input-string
    var lastChar = text.charAt(text.length-1)
    if (lastChar === " ") {
      text = text.substring(0, text.length-1)
    }
    if (lastChar !== "." || lastChar !== "!" || lastChar !== "?" ) {
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
