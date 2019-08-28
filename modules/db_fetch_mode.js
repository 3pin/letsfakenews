// functions for how stories are fetched from the database... random/stepwise etc

const debug = require('debug')('db_fetch_mode')

// pick a random entry with which to pick an '_id' entry from the array
function random_entry(array_of_ids) {
  debug('entered db_fetch_mode(rand_entry)')
  debug('lenght of array: ' + array_of_ids.length);
  let randomnumber = Math.floor(Math.random() * (array_of_ids.length));
  debug(randomnumber);
  let entry_to_read = randomnumber
  let id = array_of_ids[entry_to_read];
  debug('About to read entry _id: ' + id)
  return {
    id: id,
    db_mode: 'random',
    entry_to_read: entry_to_read
  }
}
// pick next entry
function next_entry(array_of_ids, entry_to_read) {
  let id, db_mode;
  if (entry_to_read == null) {
    entry_to_read = 0;
    debug('set entry_to_read from NULL to 0');
  }
  entry_to_read = parseInt(entry_to_read);
  debug('entered db_fetch_mode(next_entry)... array_length:' + array_of_ids.length + ' activelist_entry_to_read:' + entry_to_read)
  if (entry_to_read > array_of_ids.length-1 || entry_to_read < 0) {
    //db_mode = 'random';
    id = array_of_ids[0];
    entry_to_read = 1;
  } else {
    db_mode = 'next';
    id = array_of_ids[entry_to_read];
    entry_to_read++;
  }
  debug('About to read entry id: ' + id);
  debug('db_mode for next time: ' + db_mode);
  return {
    id: id,
    db_mode: db_mode,
    entry_to_read: entry_to_read
  }
}
module.exports.random_entry = random_entry;
module.exports.next_entry = next_entry;
