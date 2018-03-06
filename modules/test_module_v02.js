//a module to ingest text and filter/parse it per-sentence down to required Pos-tags
function test_module(input_text, doneCallback) {
  // data input... text
  var text = input_text
  console.log("Input text: " + text)
  var stringer = "module.printer: internal variable: I like flowers"
  return doneCallback(null, stringer); // pass through full results
}

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
