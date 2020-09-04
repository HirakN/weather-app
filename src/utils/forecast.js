const request = require('request')

const access_key = process.env.WEATHERSTACK_KEY || "63fc7d6bad403d16d3da55637c202805"
// http://api.weatherstack.com/current?access_key=63fc7d6bad403d16d3da55637c202805&query=
const forecast = (lat, long, callback) => {
    const url= 'http://api.weatherstack.com/current?access_key=' + access_key + '&query=' + lat + ',' + long

    request({url, json: true}, (error, { body }) => {
        console.log(body)
        if (error) {
            callback('Unable to connect to weatherstack forecast services.', undefined, undefined)
        } else if (body.error) {
            callback("weatherstack api: " + body.error.info, undefined, undefined)
        } else {
            const data = body.current
            callback(undefined, `${data.weather_descriptions[0]}. It is currently ${data.temperature}, and it feels like ${data.feelslike}. The air humidity is ${data.humidity}%.`, data.weather_icons[0])
        }
    })
}

module.exports = forecast