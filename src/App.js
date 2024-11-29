import React, { useState, useEffect } from 'react';
import './App.css';

import SearchInput from './components/SearchInput';
import WeatherInfo from './components/WeatherInfo';

import cloudsImage from './resources/clouds-image.jpg'

function App() {
  const [weatherApiKey] = useState('API_Key');
  const [imageApiKey] = useState('API_Key');
  const [weatherData, setWeatherData] = useState();
  const [searchedCityId, setSearchedCityId] = useState();
  const [cityImage, setCityImage] = useState(null);
  const [previewCityArray] = useState([2618724, 2801268, 136022, 1988803, 803267, 714482, 287907, 1284918, 555772, 3125553, 918425])
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

  const fetchCityWeather = (method, cityId) => {
    fetch(`http://api.weatherapi.com/v1/${method}.json?key=${weatherApiKey}&q=id:${cityId}&aqi=no`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        fetchCityImage(data.location);
        console.log(data);
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  };

  const fetchCityImage = (location) => {
    fetch(`https://api.unsplash.com/search/photos?query=${location.name}&client_id=${imageApiKey}&per_page=100`)
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
        setCityImage(null);
      });
  };

  return (
    <div className="app-container" style={cityImage ? { '--background-url': `url(${cityImage})` } : {}}>
      <SearchInput weatherApiKey={weatherApiKey} setCityId={setSearchedCityId} />
      {weatherData ? (
        <div className=''>
          <WeatherInfo weatherData={weatherData} />
        </div>
      ) : (
        <div>
          <h1>Fetching Data{dots}</h1>
        </div>
      )}
    </div>
  );
}

export default App;
