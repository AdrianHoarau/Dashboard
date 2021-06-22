var Twitter = require('twitter');
var config = require('../routes/config.json');

async function getRetweets(token, key) {
      var client = new Twitter({
        consumer_key: config.api.twitter.keyApi,
        consumer_secret: config.api.twitter.KeyApiSecret,
        access_token_key: token,
        access_token_secret: key
      });
      var params = {
        q: '#nodejs',
        count: 10,
        result_type: 'recent',
        lang: 'en'
      }
      client.get('statuses/user_timeline', params, function(error, data, response) {
          return data;
      });
}

async function postTweet(token, key, string) {
  var client = new Twitter({
    consumer_key: config.api.twitter.keyApi,
    consumer_secret: config.api.twitter.KeyApiSecret,
    access_token_key: token,
    access_token_secret: key
  });
  client.post('statuses/update', {status:  string},  function(error, tweet, response) {
    if(error) return error;
  });
}

async function getFav(token, key) {
  var client = new Twitter({
    consumer_key: config.api.twitter.keyApi,
    consumer_secret: config.api.twitter.KeyApiSecret,
    access_token_key: token,
    access_token_secret: key
  });
  var params = {
    q: '#nodejs',
    count: 10,
    result_type: 'recent',
    lang: 'en'
  }
  client.get('favorites/list', params, function(error, data, response) {
    return data;
  });
}

exports.postTweet = postTweet;
exports.getRetweets = getRetweets;
exports.getFav = getFav;