const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=842e72a716d52703e8eabc67fda10640&query=' + latitude + ',' + longtitude
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Cannot connect with server!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(
                undefined, 
                body.current.weather_descriptions[0] + '. It is curently ' + body.current.temperature + ' degrees out. It feels like ' + 
                body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + ' %.'
            )
        }
    })
}

module.exports = forecast