import React, { useState, useEffect } from 'react';
import './App.css';

import SearchInput from './components/SearchInput';
import WeatherInfo from './components/WeatherInfo';
import FavoriteBar from './components/FavoriteBar';

import cloudsImage from './resources/clouds-image.jpg';

function getUpcomingDays(currentDayIndex) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return Array.from({ length: 3 }, (_, i) => days[(currentDayIndex + i) % 7]);
}

function App() {
  const [weatherApiKey] = useState('Your weather API Key');
  const [imageApiKey] = useState('Your image API Key');

  const [searchedCityId, setSearchedCityId] = useState(null);
  const [previewCityArray] = useState([2618724, 2801268, 136022, 1988803, 803267, 714482, 287907, 1284918, 555772, 3125553, 918425]);
  const [favoriteCitiesArray, setFavoriteCities] = useState([]);

  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [favoritesWeatherData, setFavoritesWeatherData] = useState([]);

  const [cityImage, setCityImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentDayIndex = new Date().getDay();
  const upcomingDays = getUpcomingDays(currentDayIndex);

  useEffect(() => {
    const randomCityId = previewCityArray[Math.floor(Math.random() * previewCityArray.length)];
    fetchCityWeather("current", randomCityId);
    fetchCityWeather("forecast", randomCityId);
    setSearchedCityId(randomCityId);

    fetchWeatherForMany("current", favoriteCitiesArray);

    setIsLoading(false);
  }, []);

  // Fetch data when searchedCityId changes
  useEffect(() => {
    if (searchedCityId) {
      fetchCityWeather("current", searchedCityId);
      fetchCityForecast("forecast", searchedCityId);
    }
  }, [searchedCityId]);

  // Fetch data when favoriteCitiesArray changes
  useEffect(() => {
    fetchWeatherForMany("current", favoriteCitiesArray);
  }, [favoriteCitiesArray]);

  // Fetch weather for a single city
  const fetchCityWeather = (method, cityId) => {
    fetch(`http://api.weatherapi.com/v1/${method}.json?key=${weatherApiKey}&q=id:${cityId}&aqi=no`)
      .then((response) => response.json())
      .then((data) => {
          setWeatherData(data)
          fetchCityImage(data.location)
      })
      .catch((error) => console.log("Error: ", error))
  };

  //Fetch forecast for a city
  const fetchCityForecast = (method, cityId) => {
    fetch(`http://api.weatherapi.com/v1/${method}.json?key=${weatherApiKey}&q=id:${cityId}&days=3&aqi=no`)
      .then((response) => response.json())
      .then((data) => {
          setForecastData(data);
      })
      .catch((error) => console.log("Error: ", error))
  };

  // Fetch weather for multiple cities
  const fetchWeatherForMany = (method, citiesArray) => {
    const fetchWeather = (cityId) =>
      fetch(`http://api.weatherapi.com/v1/${method}.json?key=${weatherApiKey}&q=id:${cityId}&aqi=no`)
        .then((response) => response.json())
        .catch((error) => {
          console.log("Error: ", error);
          return null;
        });

    Promise.all(citiesArray.map(fetchWeather))
      .then((fetchedData) => setFavoritesWeatherData(fetchedData.filter((data) => data)));
  };

  // Fetch image for the city
  const fetchCityImage = (location) => {
    fetch(`https://api.unsplash.com/search/photos?query=${location.name} ${location.country}&client_id=${imageApiKey}&per_page=10`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setCityImage(data.results[Math.floor(Math.random() * data.results.length)].urls.regular);
        } else {
          setCityImage(cloudsImage);
        }
      })
      .catch(() => setCityImage(cloudsImage));
  };

  return (
    <div className="app-container" style={cityImage ? { '--background-url': `url(${cityImage})` } : {}}>
      <SearchInput weatherApiKey={weatherApiKey} setCityId={setSearchedCityId} />
      {isLoading || !weatherData || !forecastData ? (
        <div>
          <h1 className="fetchingDataText">Fetching Data...</h1>
        </div>
      ) : (
        <div>
          <WeatherInfo
            weatherData={weatherData}
            forecastData={forecastData}
            cityId={searchedCityId}
            favorites={favoriteCitiesArray}
            setFavorites={setFavoriteCities}
            followingDaysArray={upcomingDays}
          />
          <FavoriteBar
            weatherApiKey={weatherApiKey}
            weatherData={favoritesWeatherData}
            setCityId={setSearchedCityId}
          />
        </div>
      )}

    </div>
  );
}

export default App;
