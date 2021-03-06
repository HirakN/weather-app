const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express()
// Use PORT variable used by heroku or 3000 if not set
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Configure express - Set a value for express settings, app.set(KEY, VALUE)
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static dir to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'ghoster'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'ghoster'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'some help message',
        title: 'Help',
        name: 'ghoster'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No location was presented'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData, weatherIconsURL) => {
            if (error) {
                return res.send({
                    error
                })
            }
            
            res.send({
                query: req.query.address,
                location,
                forecastData,
                weatherIconsURL
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        errorMessage: 'help article not found',
        title: '404',
        name: 'HN'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        errorMessage: '404 page not found',
        title: '404',
        name: 'HN'
    })
})

app.listen(port, () => {
    console.log(`Server is up.\nhttp://localhost:${port}`)
})