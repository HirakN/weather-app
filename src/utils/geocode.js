const request = require('request')

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZ2hvc3RlcnIiLCJhIjoiY2tjanE0aWQ1MWxhMTJ0cDBoa2U1NTQ1cSJ9.HCIsFE2pF4hcRINBfAFgoQ&limit=1"

    request({url: url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (body.features.length === 0) {
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
