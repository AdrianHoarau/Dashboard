# Dashboard

## Project

The purpose of this project was to create a Dashboard as a web-application.
To do so we chose NodeJs/VueJs for the server/client, as well as Docker-Compose to build the app.

This project was a 3rd year EPITECH project and it was made by :
- Adrian HOARAU (adrian.hoarau@epitech.eu)
- Matthias VIRASSAMY (matthias.virassamy@epitech.eu)

## Prerequisites

1. You need to install MongoDB to your project follow this link if you are on Fedora : https://tecadmin.net/install-mongodb-on-fedora/
2. You also need to install Docker, follow this link for fedora : https://www.techrepublic.com/article/how-to-install-docker-on-fedora-25/

## Instructions
If you would like to launch the project:

1. Fisrt step is to build the project via the command `docker-compose build` (you might need to use `sudo`)
2. Then you have to run the project using the command `docker-compose up`
3. Visit in your browser at `http://localhost:80` for the client (be carefull if you have something else running on port 80)

## About.json

1. If you want to see the `about.json` file go to `http://localhost:8080/about.json` you will see your ip
and the serverTime as well as all of our Services and Widgets

## Services and Widgets

- **Weather Service:**

_Weather_ is a service made out of OpenWeatherMap Api it was uses to implement 1 widget.

- **Weather Widgets:**

**1-** Weather Widget : A weather widget that display the temperature, country, and weather of a given City.

- **Spotify Service:**

_Spotify_ is a service made out of Spotify Api it was uses to implement 2 widgets.

- **Spotify Widgets:**

**1-** _Spotify Widget Playlists_ : A spotify widget that will display the user's public playlists.

**2-** _Spotify Widget Top_ : A spotify widget that will display x of the user's top tracks or top
artists (where 'x' is the number you want).

- **Youtube Service:**

_Youtube_ is a service made out of Youtube Api it was uses to implement 2 widgets.

- **Youtube Widgets:**

**1-** Youtube Widget Likes : A youtube widget that will display the user's last 10 likes.

**2-** Youtube Widget Subscribed : A youtube widget that will display the user's last 10 subscribtion.

- **Twitter Service:**

_Twitter_ is a service made out of Twitter Api it was uses to implement 3 widgets.

- **Twitter Widgets:**

**1-** Twitter Widget Favorites : A twitter widget that will display the user's last 10 favorites.

**2-** Twitter Widget Retweets : A twitter widget that will display the user's last 10 retweets.

**3-** Twitter Widget Tweets : A youtube widget that will allow you to post a tweet on your twitter account.
