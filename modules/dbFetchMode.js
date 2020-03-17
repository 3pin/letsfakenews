// functions for how stories are fetched from the database... random/stepwise etc

const debug = require('debug')('dbFetchMode')

// pick a random entry with which to pick an '_id' entry from the array
function randomEntry (arrayOfIds) {
  debug('entered dbFetchMode(rand_entry)')
  debug('lenght of array: ' + arrayOfIds.length)
  const randomnumber = Math.floor(Math.random() * (arrayOfIds.length))
  debug(randomnumber)
  const entryToRead = randomnumber
  const id = arrayOfIds[entryToRead]
  debug('About to read entry _id: ' + id)
  return {
    id: id,
    dbMode: 'random',
    entryToRead: entryToRead
  }
}
// pick next entry
function nextEntry (arrayOfIds, entryToRead) {
  let id, dbMode
  if (entryToRead == null) {
    entryToRead = 0
    debug('set entryToRead from NULL to 0')
  }
  entryToRead = parseInt(entryToRead)
  debug('entered dbFetchMode(nextEntry)... array_length:' + arrayOfIds.length + ' activelist_entry_to_read:' + entryToRead)
  if (entryToRead > arrayOfIds.length - 1 || entryToRead < 0) {
    // dbMode = 'random';
    id = arrayOfIds[0]
    entryToRead = 1
  } else {
    dbMode = 'next'
    id = arrayOfIds[entryToRead]
    entryToRead++
  }
  debug('About to read entry id: ' + id)
  debug('dbMode for next time: ' + dbMode)
  return {
    id: id,
    dbMode: dbMode,
    entryToRead: entryToRead
  }
}
module.exports.randomEntry = randomEntry
module.exports.nextEntry = nextEntry
