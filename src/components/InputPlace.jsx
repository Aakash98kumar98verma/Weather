import React, { useState, useEffect } from 'react'

const InputPlace = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState({ temperature: "", humidity: "" });

    const apiKey = "bd59b9cd52b33519f4309191180a2f45";

    const fetchWeather = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
            if (!response.ok) {
                console.log("City not found");
            }
            const data = await response.json();
            setWeather({
                temperature: data.main.temp,
                humidity: data.main.humidity
            });
        } catch (error) {
            console.log(error.message);
            
            setWeather({ temperature: "", humidity: "" });
        }
    };

    useEffect(() => {
        if (city) {
            fetchWeather(city);
        }
    }, []);

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (city) {
            fetchWeather(city);
        }
    };

    return (
        <div>
            <div>
                <div className="mb-3">
                    <label htmlFor="placeInput" className="form-label">Enter Name of Place:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="placeInput"
                        value={city}
                        onChange={handleInputChange}
                        aria-describedby="placeHelp"
                    />
                </div>

                {/* Display temperature and humidity */}
                <div className="mb-3">
                    {weather.temperature !== null && (
                        <>
                            <p>Temperature: {weather.temperature}°C</p>
                            <p>Humidity: {weather.humidity}%</p>
                        </>
                    )}
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default InputPlace;
