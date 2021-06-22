const fetch = require("node-fetch");


async function getPlaylists(token) {
    const result = await fetch('https://api.spotify.com/v1/me/playlists', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
    const data = await result.json();
    return data;
}

async function getTopTrack(token, nb, type) {
    const result = await fetch('https://api.spotify.com/v1/me/top/'+ type +'?limit=' + nb + '&offset=0', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
    const data = await result.json();
    return data;
}

exports.getPlaylists = getPlaylists;
exports.getTopTrack = getTopTrack;