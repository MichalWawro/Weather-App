import React, { useState, useEffect } from 'react';
import './App.css';

// Component imports
import SearchInput from './components/SearchInput';

function App() {
  const [apiKey] = useState('API_Key');
  const [searchedCity, setSearchedCity] = useState({});
  const [currentCity, setCurrentCity] = useState({ name: "Warsaw", country: "Poland" })

  useEffect(() => {
    if (searchedCity?.name) {
      handleCitySelect(searchedCity);
    }
  }, [searchedCity]);

  const handleCitySelect = (searchedCity) => {
    fetchWeatherForCity("current", searchedCity.name);
  };

  const fetchWeatherForCity = (method, searchedCity) => {
    fetch(`http://api.weatherapi.com/v1/${method}.json?key=${apiKey}&q=${searchedCity}&aqi=no`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentCity({ name: data.location.name, country: data.location.country });
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  };

  return (
    <div className="App-container">
      <SearchInput apiKey={apiKey} setCity={setSearchedCity} />
      <button onClick={() => fetchWeatherForCity("current", "London" )}>
        Get weather for London
      </button>
      <h1>{currentCity.name}, {currentCity.country}</h1>
    </div>
  );
}

export default App;
