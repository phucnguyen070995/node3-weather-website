const express = require('express')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')
const path = require('path')
const hbs = require('hbs')
// console.log(__dirname)
// console.log(__filename)

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// dong nay de su dung duoc hbs
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    geocode("ho chi minh city", (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return console.log('Error: ', error)
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return console.log('Error: ', error)
            } 
            res.render('index',{
                title: 'Weather',
                name: "Hoang Phuc",
                latitude,
                longtitude,
                location,
                forecastData
            })
        })
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: "Hoang Phuc"
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: "Hoang Phuc"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must to provide a search address'
        })
    }
    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            } 
            res.send({
                latitude,
                longtitude,
                location,
                forecastData
            })
        })
    }) 
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found',
        name: "Hoang Phuc"
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found',
        name: "Hoang Phuc"
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000!')
})