// functions for how stories are fetched from the database... random/stepwise etc

const debug = require('debug')('db_fetch_mode')

// pick a random entry with which to pick an '_id' entry from the array
function random_entry(array_of_ids) {
  debug('entered db_fetch_mode(rand_entry)')
  let randomnumber = Math.floor(Math.random() * (array_of_ids.length));
  let entry_to_read = randomnumber
  let id = array_of_ids[entry_to_read];
  debug('About to read entry _id: ' + id)
  return {
    id: id,
    db_mode: 'old_story'
  }
}
// pick next entry
function next_entry(array_of_ids, id_to_read) {
  id_to_read = parseInt(id_to_read);
  debug('entered db_fetch_mode(next_entry): ' + id_to_read)
  let db_mode;
  if (id_to_read == array_of_ids.length-1) {
    db_mode = 'old_story'
  } else if ('id_to_read' == 0) {
    db_mode = 'old_story'
  } else {
    id_to_read++;
    db_mode = 'new_story'
  }
  let _id = array_of_ids[id_to_read];
  debug('About to read entry _id: ' + _id)
  debug('db_mode for next time: ' + db_mode)
  return {
    id: _id,
    db_mode: db_mode,
    id_to_read: id_to_read
  }
}
module.exports.random_entry = random_entry;
module.exports.next_entry = next_entry;
