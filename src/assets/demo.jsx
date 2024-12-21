import React, { useState, useEffect } from 'react'

const InputPlace = () => {
    // State to store the city, weather data, and errors
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState({ temperature: null, humidity: null });
    const [error, setError] = useState(null);

    const apiKey = 'YOUR_API_KEY';  // Make sure to replace with your actual API key from OpenWeather

    // Function to fetch weather data
    const fetchWeather = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            setWeather({
                temperature: data.main.temp,
                humidity: data.main.humidity
            });
            setError(null); // Clear any previous errors
        } catch (error) {
            setWeather({ temperature: null, humidity: null });
            setError(error.message); // Set error message
        }
    };

    // Use useEffect to fetch weather when city is updated
    useEffect(() => {
        if (city) {
            fetchWeather(city);
        }
    }, [city]);

    // Handle input change
    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    // Handle form submission to avoid page reload
    const handleSubmit = (event) => {
        event.preventDefault();
        if (city) {
            fetchWeather(city);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="placeInput" className="form-label">Enter Name of Place:</label>
                    <input
                        type="search"
                        className="form-control"
                        id="placeInput"
                        value={city}
                        onChange={handleInputChange}
                        aria-describedby="placeHelp"
                    />
                </div>

                {/* Show error if city is not found */}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Display temperature and humidity */}
                <div className="mb-3">
                    {weather.temperature !== null && (
                        <>
                            <p>Temperature: {weather.temperature}°C</p>
                            <p>Humidity: {weather.humidity}%</p>
                        </>
                    )}
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default InputPlace;
