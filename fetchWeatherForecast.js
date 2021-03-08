// Fetch elements on the page
const form = document.getElementById('weather');
const latitude = document.getElementById('lat');
const longitude = document.getElementById('lon');
const apiKey = document.getElementById('api_key');
const temperatureDetails = document.getElementById('temp')
const weatherConditionDetails = document.getElementById('weather_condition');

// Fetch filter criteria
let filterCriteria;
fetch('./data.json')
.then(response => response.json())
.then((data) => {
    filterCriteria = data;
})
.catch(err => console.error('Error reading properties from JSON file'))

/*
Fetch `daily` weather forecast updates for the inputted data 
and output the calculated data
*/
form.addEventListener('submit', (event) => {
    const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude.value}&lon=${longitude.value}&exclude=hourly,current,minutely,alerts&units=metric&appid=${apiKey.value}`;
    
    fetch(url)
    .then(response => response.json())
    .then((data) => {
        const { daily } = data;
        const calculatedData = weatherCalculation(daily, filterCriteria);
        temperatureDetails.textContent = `#days > 23 degrees predicted: ${calculatedData.expectedTemperatureDays}`;
        weatherConditionDetails.textContent = `#days sunny weather predicted: ${calculatedData.expectedWeatherConditionDays}`;
    })
    .catch(err => console.error('Error fetching forecast data:', err))

    event.preventDefault(); //prevents the default action of submitting the form
});

function weatherCalculation(forecastData, filterCriteria) {
    const dailyTemperatureData = [], dailyWeatherConditionData = [];
    let expectedTemperatureDays = 0, expectedWeatherConditionDays = 0;
    for (let i = 0; i < filterCriteria.noOfDays; i++) {
        // Store daily temperature data
        dailyTemperatureData.push(forecastData[i].temp);

        // Store daily weather condition data
        dailyWeatherConditionData.push(forecastData[i].weather[0]);
    }

    console.log('DailyTempData', dailyTemperatureData);
    console.log('DailyWeatherConditionData', dailyWeatherConditionData);

    /*
    Iterate through daily temperature data and identify number of days 
    matching the criteria
    */ 
    dailyTemperatureData.forEach((temperature) => {
        if (temperature.max > filterCriteria.expectedTemperature) {
            expectedTemperatureDays++; 
        }
    })

    /*
    Iterate through daily weather condition data and identify number of days 
    matching the criteria
    */ 
    dailyWeatherConditionData.forEach((weatherCondition) => {
        if (weatherCondition.main === filterCriteria.expectedWeatherCondition) {
            expectedWeatherConditionDays ++;
        }
    })

    return {
        expectedTemperatureDays,
        expectedWeatherConditionDays 
    }
}