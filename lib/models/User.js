var uuid = require('uuid');

var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    uuid        : { type: 'alphanumericdashed', unique: true, index: true, required: true },
    username    : { type: 'string', unique: true },
    email       : { type: 'email',  unique: true },
    accessLevel : {
      type: 'integer',
      enum: [0, 99],
      min: 0,
      max: 99,
      notNull: true,
      defaultsTo: 0
    },
    passports   : { collection: 'Passport', via: 'user' }
  },

  /**
   * Callback to be run before validating a User.
   *
   * @param {Object}   user The soon-to-be-created user
   * @param {Function} next
   */
  beforeValidate: function(user, next) {
    // Generate a UUID for the user
    if (user.uuid === undefined) {
      user.uuid = uuid.v4();
    }
    next();
  },

  // afterValidate: fn(user, next) {},

  /**
   * Callback to be run before creating a User.
   *
   * @param {Object}   user The soon-to-be-created user
   * @param {Function} next
   */
  // beforeCreate: function(user, next) {},
  
  // afterCreate: function(user, next) {},
  // beforeUpdate: function(user, next) {},
  // afterUpdate: function(user, next) {},
  // beforeDestroy: function(criteria, cb) {},
  // afterDestroy: function(cb) {},

};

module.exports = User;
