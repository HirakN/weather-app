const request = require('request')
const fs = require('fs')

const forecast = (lat, long, callback) => {
    const access_key = process.env.WEATHERSTACK_KEY || fs.readFileSync(process.env.WEATHERSTACK_KEY_FILE, { encoding: 'utf-8' })
    const url = 'http://api.weatherstack.com/current?access_key=' + access_key + '&query=' + lat + ',' + long

    request({ url, json: true }, (error, { body }) => {
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