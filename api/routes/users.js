/**
 * @ Author: adrian.hoarau@epitech.eu
 * @ Create Time: 2020-11-06 10:55:32
 * @ Modified by: adrian.hoarau@epitech.eu
 * @ Modified time: 2020-11-29 21:29:27
 * @ Description:
 */

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var SpotifyStrategy = require('passport-spotify').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var GitHubStrategy = require('passport-github2').Strategy;
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var config = require('./config.json');
var weather = require('../services/weather')
var spotify = require('../services/spotify')
var youtube = require('../services/youtube')
var sendEmail = require('../services/email')
var twitter = require('../services/twitter')
const url = require('url');
var URL = require('url').URL;
var User = require('../models/user');
var about = require('./about.json');
var Twitter = require('twitter');

router.use(passport.initialize());

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/about.json', function(req, res) {
	var result = JSON.parse(JSON.stringify(about));
  var time = Math.floor(+new Date() / 1000);
  var oldIp = req.connection.remoteAddress;
  var regex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  var newIp = oldIp.match(regex);
  result.client.host = newIp;
  result.server.current_time = time;
	res.json(result);
});

router.get('/api/spotify/getauth', function(req, res) {
  User.findOne({_id : req.user.id}, function(err, user) {
  var token = user.spotifyToken;
  if (token == null)
    res.json({ auth: 'false' });
  else
    res.json({ auth: 'true' });
  })
});

router.get('/api/twitter/getauth', function(req, res) {
  User.findOne({_id : req.user.id}, function(err, user) {
  var token = user.twitterToken;
  if (token == null)
    res.json({ auth: 'false' });
  else
    res.json({ auth: 'true' });
  })
});

router.get('/api/youtube/getauth', function(req, res) {
  User.findOne({_id : req.user.id}, function(err, user) {
    var token = user.googleToken;
    if (token == null)
       res.json({ auth: 'false' });
    else
      res.json({ auth: 'true' });
  })
});

router.get('/api/weather/', function(req, res) {
  var current_url = new URL("http://"+req.url);
  var search_params = current_url.searchParams;
  var city = search_params.get('city');
  weather.getWeather(city).then((tmp) => {
    res.json(tmp);
  });
});

router.get('/api/delete/widget/', function(req, res) {
  var index = req.query.index;
  var id = req.query.id;
  var widgetId = index+"-"+id;

  User.findOne({_id : req.user.id}, function(err, user) {
    
    user.widgets.forEach(function(item, index, array) {
      if (item.i == widgetId) {
        user.widgets.splice(index, 1);
        user.save();
      }
    });
    res.json({res: true});
  });
});

router.get('/api/checkauth', function(req, res) {
  if (req.user == undefined)
    res.json({res: false});
  else
    res.json({res: true});
});

router.get('/api/load/widget', function(req, res) {
  User.findOne({_id : req.user.id}, function(err, user) {
    res.json(user.widgets);
  });
});

router.get('/api/twitter/liked', function(req, res) {
  User.findOne({_id : req.user.id}, function(err, user) {
    var token = user.twitterToken;
    var tokenSecret = user.twitterTokenSecret;
    var client = new Twitter({
      consumer_key: config.api.twitter.keyApi,
      consumer_secret: config.api.twitter.KeyApiSecret,
      access_token_key: token,
      access_token_secret: tokenSecret
    });
    var params = { q: '#nodejs', count: 10, result_type: 'recent', lang: 'en'}
    client.get('favorites/list', params, function(error, data, response) {
      res.json(data);
    });
  })
});

router.get('/api/twitter/retweet', function(req, res) {
  User.findOne({_id : req.user.id}, function(err, user) {
    var token = user.twitterToken;
    var tokenSecret = user.twitterTokenSecret;
    var client = new Twitter({
      consumer_key: config.api.twitter.keyApi,
      consumer_secret: config.api.twitter.KeyApiSecret,
      access_token_key: token,
      access_token_secret: tokenSecret
    });
    var params = { q: '#nodejs', count: 10, result_type: 'recent', lang: 'en'}
    client.get('statuses/user_timeline', params, function(error, data, response) {
        res.json(data);
      });
  })
});

router.get('/api/twitter/post/', function(req, res) {
  User.findOne({_id : req.user.id}, function(err, user) {
    var token = user.twitterToken;
    var tokenSecret = user.twitterTokenSecret;
    var string = req.query.tweet;
    twitter.postTweet(token, tokenSecret, string);
  })
});

router.get('/api/clear/widget', function(req, res) {
  User.findOne({_id : req.user.id}, function(err, user) {
      user.widgets = [];
      user.save();
      res.json({res: true});
  });
});

router.get('/api/save/widget/', function(req, res) {
  User.findOne({_id : req.user.id}, function(err, user) {
    if (user) {
      if (user.widgets.indexOf({index: req.query.index, x: req.query.x, y: req.query.y, w: req.query.w, h: req.query.h, i: req.query.i}) === -1) {
        user.widgets.push({index: req.query.index, x: req.query.x, y: req.query.y, w: req.query.w, h: req.query.h, i: req.query.i});
      }
      user.save();
    }
  })
  res.json({res: true});
});

router.get('/api/youtube/channels', function(req, res) {
  User.findOne({_id : req.user.id}, function(err, user) {
      var token = user.googleToken;
      youtube.getChannels(token).then((tmp) => {
          res.json(tmp);
      });
  })
});

router.get('/api/youtube/liked', function(req, res) {
  User.findOne({_id : req.user.id}, function(err, user) {
  var token = user.googleToken;
  youtube.getLikes(token).then((tmp) => {
    res.json(tmp);
  });
})
});

router.get('/api/spotify/playlists', function(req, res) {
  User.findOne({_id : req.user.id}, function(err, user) {
  var token = user.spotifyToken;
  spotify.getPlaylists(token).then((tmp) => {
    res.json(tmp);
  });
})
});

router.get('/api/spotify/top/', function(req, res) {
  User.findOne({_id : req.user.id}, function(err, user) {
  var token = user.spotifyToken;
  var current_url = new URL("http://"+req.url);
  var search_params = current_url.searchParams;
  var nb = search_params.get('nb');
  // type = artists or tracks
  var type = search_params.get('type');
  spotify.getTopTrack(token, nb, type).then((tmp) => {
    res.json(tmp);
  });
})
});

router.get('/api/verif/', function(req, res) {
  var adresse = req.query.adresse;
  var token = req.query.token;
  User.getUserByEmail(adresse, function(err, user) {
    if (err) throw err;
    user.isVerified = true;
    user.save(function(err) {
      if (err) throw err;
    });
    });
   res.redirect('/users/login');
});

router.post('/api/register', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

	if (errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password
		});
    var promise =  new Promise((resolve, reject) => {

       var create = User.createUser(newUser, function(error, authData) {
       if (error) {
          reject(error);
       } else {
          resolve(authData);
        }
      });
      create.catch((error) => {
        reject(error);
        console.error(error);
     });
    }
  ).catch((error) => {
    req.flash("Email already exist !");
    res.redirect('http://localhost:80/register');
});

   promise.then(async function(authData) {
       var token = await sendEmail.sendEmail(email);
       User.getUserByEmail(email, function(err, user) {
        if (err) throw err;
        user.token = token;
        user.save(function(err) {
          if (err) throw err;
          });
       });
        req.flash('success_msg', 'You are registered and can now login');
        res.redirect('http://localhost:80/login');
   })
  }
});

var scopes = [
  "https://www.googleapis.com/auth/chat", 
  "https://www.google.com/m8/feeds",
  "https://www.googleapis.com/auth/youtube",
];

passport.use(new GoogleStrategy({
  clientID: config.auth.google.clientId,
  clientSecret: config.auth.google.clientSecret,
  callbackURL: config.auth.google.callBack,
  scope:  scopes,
  passReqToCallback : true,
},
function(req, accessToken, refreshToken, profile, done) {
  User.findOne({_id : req.user.id}, function(err, user) {
    if (err) {
      console.log("err = " + err);
    }
    if (user) {
      user.googleToken = accessToken;
      user.save(function(err) {
          if (err) throw err;
      });
    }
    return done(null, user);
  })
}
));

passport.use(new GitHubStrategy({
  clientID: config.auth.github.clientId,
  clientSecret: config.auth.github.clientSecret,
  callbackURL: config.auth.github.callBack,
  scope: 'user:email',
},
function(accessToken, refreshToken, profile, done) {
  User.getUserByEmail(profile.emails[0].value, function(err, user) {
    if(err) {
      console.log(err);  
    }
    
    if (user) {
      user.githubToken = accessToken;
      user.save(function(err) {
      if (err) throw err;
      });
      done(null, user); 
    } else { 
      user = new User({
        name: profile.name,
        email:profile.emails[0].value,
        username: profile.username,
        password: profile.accessToken,
        githubToken: accessToken
      });
      user.save(function(err) { 
        if(err) {
          console.log(err);  
        } else {
          done(null, user);
        }
      });
    }
  });
}
));

passport.use(new LinkedInStrategy({
  clientID: config.auth.linkedin.clientId,
  clientSecret: config.auth.linkedin.clientSecret,
  callbackURL: config.auth.linkedin.callBack
},function(accessToken, refreshToken, profile, done) {
  //Check the DB to find a User with the profile.id
  User.getUserByEmail(profile.emails, function(err, user) {
    if(err) {
      console.log(err);  
    }
    
    if (user) {
      done(null, user); 
    } else { 
      user = new User({
        name: profile.name.familyName,
        email:profile.emails,
        username: profile.username,
        password: profile.accessToken,
        linkedinToken: accessToken
      });
      user.save(function(err) { 
        if(err) {
          console.log(err);  
        } else {
          done(null, user);
        }
      });
    }
  });
}
));

passport.use(new SpotifyStrategy({
  clientID: config.auth.spotify.clientId,
  clientSecret: config.auth.spotify.clientSecret,
  callbackURL: config.auth.spotify.callBack,
  passReqToCallback : true,
},function(req, accessToken, refreshToken, profile, done) {
  User.findOne({_id : req.user.id}, function(err, user) {
    if (err) {
      console.log("err = " + err);
    }
    if (user) {
      user.spotifyToken = accessToken;
      user.save(function(err) {
          if (err) throw err;
      });
    }
    return done(null, user);
  })
}
));

passport.use(new FacebookStrategy({
  clientID: config.auth.facebook.clientId,
  clientSecret: config.auth.facebook.clientSecret,
  callbackURL: config.auth.facebook.callBack,
  passReqToCallback : true,
  profileFields: ['id', 'emails', 'name']
},   function(req, accessToken, refreshToken, profile, done) {
  //Check the DB to find a User with the profile.id
  User.getUserByEmail(profile.emails[0].value, function(err, user) {
    if(err) {
      console.log(err);  // handle errors!
    }
    
    if (user) {
        user.facebookToken = accessToken;
        user.save(function(err) {
          if (err) throw err;
      });
      done(null, user); //Login if User already exists
    } else { //else create a new User
      user = new User({
        name: profile.name.familyName,
        email:profile.emails[0].value,
        username: profile.name.middleName,
        password: profile.accessToken,
        facebookToken: accessToken
      });
      user.save(function(err) { //Save User if there are no errors else redirect to login.
        if(err) {
          console.log(err); 
          throw err; // handle errors!
        } else {
          done(null, user);
        }
      });
    }
  });
}
));

passport.use(new TwitterStrategy({
  consumerKey: config.auth.twitter.clientId,
  consumerSecret: config.auth.twitter.clientSecret,
  callbackURL: config.auth.twitter.callBack,
  passReqToCallback : true,
}
,function(req, access_token_key, access_token_secret, refreshToken, profile, done) {
  User.findOne({_id : req.user.id}, function(err, user) {
    if (err) {
      console.log("err = " + err);
    }
    if (user) {
      user.twitterToken = access_token_key;
      user.twitterTokenSecret = access_token_secret;
      user.save(function(err) {
          if (err) throw err;
      });
    }
    return done(null, user);
  })
}
));

passport.use(new LocalStrategy({
    passReqToCallback : true,
  },
  function(req, username, password, done) {
    req.checkBody('email' , 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password' , 'Invalid password').notEmpty().isLength({min:4})
    var errors = req.validationErrors();
    if (errors) {
      var messages = [];
      errors.forEach(function(error){
        messages.push(error.msg);
      });
    }
    User.getUserByEmail(username, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, {message: 'Unknown User'});
      }
      if (user.isVerified == false) {
        return done(null, false, {message: 'Email not verified'});
      }
      User.comparePassword(password, user.password, function(err, isMatch){
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid password'});
        }
      });
    });
  }));

router.post(
  '/login',
  passport.authenticate(
    'local',
    {
      failureRedirect: '/users/login',
      failureFlash: true
    }),
  function(req, res) {
    res.redirect('/dashboard');
  });
  
  router.post(
    '/api/login',
    passport.authenticate(
      'local',
      {
        failureRedirect: 'http://localhost:80/login',
        failureFlash: true
      }),
    function(req, res) {
      res.redirect('http://localhost:80/dashboard');
    });

router.post('/api/auth/spotify',
    passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private', 'user-top-read']}));

router.post('/api/auth/facebook',
    passport.authenticate('facebook', { scope : ['email'] }));

router.post('/api/auth/twitter',
    passport.authenticate('twitter'));

router.post('/api/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }));

router.post('/api/auth/google',
passport.authenticate('google', { scope:
  [ 'https://www.googleapis.com/auth/userinfo.email', 'profile', 'https://www.googleapis.com/auth/youtube' ] }
));
"https://www.googleapis.com/auth/youtube.force-ssl",
"https://www.googleapis.com/auth/youtube",
"https://www.googleapis.com/auth/youtube.readonly"

router.post('/api/auth/linkedin',
passport.authenticate('linkedin', { scope: ['r_emailaddress', 'r_liteprofile'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:80/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('http://localhost:80/dashboard');
      });

router.get('/github/callback',
passport.authenticate('github', { successRedirect: 'http://localhost:80/dashboard',
                                    failureRedirect: 'http://localhost:80/login' }));

router.get('/linkedin/callback',
passport.authenticate('linkedin', { successRedirect: 'http://localhost:80/dashboard',
                                    failureRedirect: 'http://localhost:80/login' }));

router.get('/spotify/callback',
    passport.authenticate('spotify', { failureRedirect: 'http://localhost:80/dashboard' }),
    function(req, res) {
      res.redirect('http://localhost:80/dashboard');
      });

router.get('/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: 'http://localhost:80/login' }),
    function(req, res) {
      res.redirect('http://localhost:80/dashboard');
      });

router.get('/facebook/callback',
passport.authenticate('facebook', { successRedirect: 'http://localhost:80/dashboard',
                                    failureRedirect: 'http://localhost:80/login' }));

router.get('/api/logout', function(req, res){
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('http://localhost:80/login');
});

module.exports = router;