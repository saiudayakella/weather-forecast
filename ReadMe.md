## Introduction
This is a simple weather app which takes geographical co-ordinates i.e. latitude and longitude of a place as input and outputs the following data for the next <n> days (including current day respective to timezone):

* no of days temperature is predicted to be more than <n> degrees and weather conditions are predicted to be sunny

## Technologies used
This app is created with:
* Plain/Vanilla JavaScript
* HTML
* CSS

## Setup
Setting up this app is pretty simple. All you need is:

1) Local web server
2) Web browser (except IE)

Note: Fetch API which is part of JavaScript is not supported on IE and requires a polyfill. For simplicity purposes, polyfill code is not handled in the app.

### Steps to setup local server:
* If you are using visual studio code:
  - Install `Live Server` extension from visual studio marketplace

* Else: 
  - Install simple node.js http-sever on your machine via npm - `npm install http-server -g`
  - Start the server by navigating to project root directory - `http-server`

Note: For installing `node.js http-server`, `NodeJS` should already be installed on your machine 

## Usage
Clone the repo on your machine and follow the below instructions:
* If using visual studio code, right click the `index.html` and select the option `Open with Live Server`
 Else, open index.html via localhost i.e. invoke browser and go to address `http://localhost/<port on which local server is running>/index.html`

* Input latitude and langitude of geolocation for which the calculated weather  data to be retrieved 
    (For Sydney, "lat": -33.8679, "lon": 151.2073)

* Enter `OpenWeatherMap API Key` and click `FetchForecastData` button

Note: For filter criteria such as no of days to be considered for forecast , weather condition, tempearature are set in `data.json` file. Respective values can be changed to retrieve different data. Please be mindful `One Call API` provides forecast for 7 days and historical weather data for previous 5 days 

## Considerations
* Max daily temperature is considered for filtering temperature data

* From the list of weather condition codes provided by openweathermap (https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2), `Clear` is considered as Sunny

* As part of free subscription, `One Call API` and `5 Day / 3 Hour Forecast` provides 5 day forecast. `One Call API` provides an option to exclude hourly, minutely data and hence, fixed that as part of the logic. 

