var config = require('../routes/config.json')
const fetch = require("node-fetch");

async function getWeather(city) {
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + config.api.weather.keyApi + "&units=metric"
    var tmp = await fetch(url).then((response) =>
        response.json().then((data) => {return data})
    );
    return tmp;
  }
exports.getWeather = getWeather;