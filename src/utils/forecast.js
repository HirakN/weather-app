const request = require('request')

const forecast = (lat, long, callback) => {
    const url= 'http://api.weatherstack.com/current?access_key=63fc7d6bad403d16d3da55637c202805&query=' + lat + ',' + long

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services.', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const data = body.current
            callback(undefined, `${data.weather_descriptions[0]}. It is currently ${data.temperature}, and it feels like ${data.feelslike}`)
        }
    })
}

module.exports = forecast