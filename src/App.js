import React, { useState, useEffect } from 'react';
import './App.css';

// Component imports
import SearchInput from './components/SearchInput';
import WeatherInfo from './components/WeatherInfo';

function App() {
  const [apiKey] = useState('API_Key');
  const [weatherData, setWeatherData] = useState();
  const [searchedCityId, setSearchedCityId] = useState();
  const [previewCityArray] = useState([2618724, 2801268, 136022, 1988803, 803267, 714482, 287907, 1284918, 555772, 3125553, 918425])
  const [dots, setDots] = useState("");

  useEffect(() => {
    fetchWeatherForCity("current", previewCityArray[Math.floor(Math.random() * previewCityArray.length)]);

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
      fetchWeatherForCity("current", searchedCityId);
    }
  }, [searchedCityId]);

  const fetchWeatherForCity = (method, cityId) => {
    fetch(`http://api.weatherapi.com/v1/${method}.json?key=${apiKey}&q=id:${cityId}&aqi=no`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        console.log(data);
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  };

  return (
    <div className="app-container">
      <SearchInput apiKey={apiKey} setCityId={setSearchedCityId} />
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
