//a module to ingest text and filter/parse it per-sentence down to required Pos-tags

module.exports = {

  printer: function(input_text) {

    // data input... text
    var text = input_text
    console.log("Input text: " + text)

    var stringer = "module.printer: internal variable: I like flowers"
    return stringer
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
