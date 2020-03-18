const debug = require('debug')('models');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const Base = require('./base.model');

const saltRounds = 10;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  collection: process.env.DATABASE,
});

UserSchema.pre('save', function presave(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    debug('Activating mongoose-hook pre-save');
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds,
      (err, hashedPassword) => {
        if (err) {
          next(err);
        } else {
          document.password = hashedPassword;
          next();
        }
      });
  } else {
    debug('Not activating hook pre-save');
    next();
  }
});

UserSchema.methods.isCorrectPassword = function isCorrectPassword(password, callback) {
  bcrypt.compare(password, this.password, (err, same) => {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

// Export the model
module.exports = Base.discriminator('User', UserSchema);
