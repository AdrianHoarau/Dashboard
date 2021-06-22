var config = require('../routes/config.json');

var api_key = config.api.youtube.keyApi;
const fetch = require("node-fetch");

async function getChannels(token) {
    const result = await fetch('https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=10&mine=true&key=' + api_key, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
    var data = await result.json();
    return data;
}

async function getLikes(token) {
    const result = await fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=10&myRating=like&key=' + api_key, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
    var data = await result.json();
    return data;
}

exports.getLikes = getLikes;
exports.getChannels = getChannels;
