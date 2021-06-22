/**
 * @ Author: adrian.hoarau@epitech.eu
 * @ Create Time: 2020-11-06 10:55:32
 * @ Modified by: adrian.hoarau@epitech.eu
 * @ Modified time: 2020-11-29 13:24:55
 * @ Description:
 */

const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var WidgetType = new Object();
WidgetType.index = 0;
WidgetType.x = 0;
WidgetType.y = 0;
WidgetType.w = 0;
WidgetType.h = 0;
WidgetType.i = "";

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    index: true
  },
  name: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  token: {
    type: String
  },
  facebookToken: {
    type: String
  },
  spotifyToken: {
    type: String
  },
  youtubeToken: {
    type: String
  },
  githubToken: {
    type: String
  },
  linkedinToken: {
    type: String
  },
  twitterToken: {
    type: String
  },
  twitterTokenSecret: {
    type: String
  },
  googleToken: {
    type: String
  },
  widgets: [{
    index: {type: Number},
    x: {type: Number},
    y: {type: Number},
    w: {type: Number},
    h: {type: Number},
    i: {type: String},
  }]
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByEmailAndUsername = function(email, username, callback) {
  var query = {email: email, username: username};
  User.findOne(query, callback);
}

module.exports.getUserByEmail = function(email, callback) {
  var query = {email: email};
  User.findOne(query, callback);
}

async function wrapperFunc(email)
{
    var query = {email: email};

    var final = await User.findOne(query);
    if (final != null) {
      return (true);
    }
    return false;
}

async function test(newUser, callback)
{
  var val = await wrapperFunc(newUser.email);

  if (val == true) {
    return (true);
  } else {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
      });
    });
    return (false);
  }
}

module.exports.createUser = async function(newUser, callback) {

  var response = await test(newUser, callback);

  if (response == true) {
    throw ("User already exist");
  }
}

module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
};