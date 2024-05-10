const request = require('request')
const fs = require('fs')

const geoCode = (address, callback) => {
    const mapbox_token = process.env['MAPBOX_TOKEN'] || fs.readFileSync(process.env.MAPBOX_TOKEN_FILE, { encoding: 'utf-8' })
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" + mapbox_token + "&limit=1"

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to mapbox location services.', undefined)
        } else if (body?.message) {
            callback('mapbox api: ' + body.message, undefined)
        } else if (body?.features?.length === 0) {
            callback('Unable to find location, Try another search', undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name
            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geoCode
