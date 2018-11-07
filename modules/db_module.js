/*

var debug = require('debug')('db_module')

// set our internal DB variable
const db = req.db;
// Set our collection
const collection = db.get(process.env.COLLECTION);
//read-mode, new_story || random_story
let db_mode = 'new_story';
// array of the entry_times of each database entry
let db_entry_times;
// db entry to read
let entry_to_read;
// newest_entry_read
let newest_entry_read = 0;

module.exports = {

  process: function(client_JSON) {
    let jsonObj = client_JSON
    collection.insert(jsonObj, function(err, result) {
      if (err) {
        debug(err);
      } else {
        debug('Document inserted to db successfully');
        db_mode = 'new_story';
        debug('Mode switch: ' + db_mode);
        //
        // return an array with the list of all the '_id' in the test_collection
        collection.find({}, {
          fields: {
            _id: 1
          }
        }, function(err, data) {
          if (err) {
            debug(err);
          } else {
            db_entry_times = data;
            debug('Total number of db_entries now: ' + db_entry_times.length)
          }
        });
      }
    });
  }
}
*/
