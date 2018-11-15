// debug printing
const debug = require('debug')('db_fetch_mode')

// pick next entry
function next_entry(array_of_ids, id_to_read) {
  debug('entered db_fetch_mode: ' + id_to_read)
  id_to_read++;
  let db_mode
  if (id_to_read > array_of_ids.length) {
    id_to_read = 1
    db_mode = 'old_story'
    debug(db_mode)
  } else {
    db_mode = 'new_story'
    debug(db_mode)
  }
  let id = array_of_ids[id_to_read - 1];
  debug('About to read entry _id: ' + id)
  return {
    id: id,
    db_mode: db_mode,
    id_to_read: id_to_read
  }
}

// pick a random entry with which to pick an '_id' entry from the array
function random_entry(array_of_ids) {
  let randomnumber = Math.floor(Math.random() * (array_of_ids.length));
  let entry_to_read = randomnumber
  let id = array_of_ids[entry_to_read];
  debug('About to read entry _id: ' + id)
  return {
    id: id
  }
}

module.exports.next_entry = next_entry;
module.exports.random_entry = random_entry;
