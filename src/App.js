import React, { useState, useEffect } from 'react';
import './App.css';

import SearchInput from './components/SearchInput';
import WeatherInfo from './components/WeatherInfo';
import FavoriteBar from './components/FavoriteBar';

import cloudsImage from './resources/clouds-image.jpg'

function App() {
  const [weatherApiKey] = useState('Api_Key');
  const [imageApiKey] = useState('Api_Key');


  const [searchedCityId, setSearchedCityId] = useState();
  const [previewCityArray] = useState([2618724, 2801268, 136022, 1988803, 803267, 714482, 287907, 1284918, 555772, 3125553, 918425])
  const [favoriteCitiesArray, setFavoriteCities] = useState([2618724, 2801268, 136022, 1988803]);

  const [weatherData, setWeatherData] = useState();
  const [favoritesWeatherData, setFavoritesWeatherData] = useState([]);
  const [cityImage, setCityImage] = useState(null);

  const [dots, setDots] = useState("");

  useEffect(() => {
    fetchCityWeather("current", previewCityArray[Math.floor(Math.random() * previewCityArray.length)]);

    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length < 3) {
          return prevDots + ".";
        } else {
          return "";
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    console.log("Searched City ID: ", searchedCityId);
    if (searchedCityId) {
      fetchCityWeather("current", searchedCityId);
    }
  }, [searchedCityId]);

  useEffect(() => {
    console.log("Favorite Cities Array Changed", favoriteCitiesArray)
    fetchWeatherForMany("current", favoriteCitiesArray);
  }, [favoriteCitiesArray])

  const fetchCityWeather = (method, cityId) => {
    fetch(`http://api.weatherapi.com/v1/${method}.json?key=${weatherApiKey}&q=id:${cityId}&aqi=no`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        fetchCityImage(data.location);
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  };

  const fetchWeatherForMany = (method, citiesArray) => {
    const tempCitiesArray = [];
  
    const fetchWeather = (cityId) => {
      return fetch(`http://api.weatherapi.com/v1/${method}.json?key=${weatherApiKey}&q=id:${cityId}&aqi=no`)
        .then((response) => response.json())
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.log("Error: ", error);
          return null;
        });
    };
  
    Promise.all(citiesArray.map(fetchWeather)).then((fetchedData) => {
      const validData = fetchedData.filter((data) => data !== null);
      tempCitiesArray.push(...validData);
      console.log("Temp Cities Array", tempCitiesArray);
      setFavoritesWeatherData(tempCitiesArray);
    });
  };

  const fetchCityImage = (location) => {
    fetch(`https://api.unsplash.com/search/photos?query=${location.name} ${location.country}&client_id=${imageApiKey}&per_page=10`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const randomImageIndex = Math.floor(Math.random() * data.results.length);
          setCityImage(data.results[randomImageIndex].urls.regular);
        } else {
          setCityImage(cloudsImage);
        }
      })
      .catch((error) => {
        console.log("Error fetching city image: ", error);
        setCityImage(cloudsImage);
      });
  };

  return (
    <div className="app-container" style={cityImage ? { '--background-url': `url(${cityImage})` } : {}}>
      <SearchInput weatherApiKey={weatherApiKey} setCityId={setSearchedCityId} />  
      {(weatherData && favoritesWeatherData.length == favoriteCitiesArray.length) ? (
        <div className=''>
          <WeatherInfo weatherData={weatherData} />
          <FavoriteBar weatherApiKey={weatherApiKey} weatherData={favoritesWeatherData} setCityId={setSearchedCityId} />
        </div>
      ) : (
        <div>
          <h1 className='fetchinDataText'>Fetching Data{dots}</h1>
        </div>
      )}
    </div>
  );
}

export default App;
