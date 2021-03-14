const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGh1Y25ndXllbjA3MDk5NSIsImEiOiJja2xkeGk1ZmozOWpiMm5wZXZmaGpjdzhmIn0.bxAEFl0iVTq0oDC01ZUNbQ&limit=1'
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Cannot connect with server!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longtitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode