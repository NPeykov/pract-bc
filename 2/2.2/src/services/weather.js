import axios from 'axios'

export function getWeather(city) {
    return axios
        .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city}`)
        .then(response => {
            return weatherResponseAdapt(response.data);
        })
}

function weatherResponseAdapt(data) {
    const current  = data.current
    return {
        ubication: data.request.query,
        time: current.observation_time,
        temperature: current.temperature,
        icon: current.weather_icons[0],
        pressure: current.pressure,
        humidity: current.humidity
    };
}