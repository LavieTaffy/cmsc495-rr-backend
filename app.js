/* ||  TODO for app.js - Mongoose implementation, Controllers, Router for api, etc */

/* ||  Imports */
require('dotenv').config()
require('./config/passport');
const connectDB = require('./config/connectDB')
const recipeRouter = require('./routes/api/recipes')
const authRouter = require('./routes/api/auth')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const passport = require('passport')


/* ||  Creating an Express App stored in app */
const express = require('express')
const app = express()


// Defined a PORT for our app http://localhost:4000, or use a port in .env file
const PORT = process.env.PORT || 4000


/* ||  Example Custom Middleware Logger */
app.use((req, res, next) => {
    // will log (/, or /index), GET, and who made the request ex) www.google.com
    //because they are the only route definitions we have
    console.log(req.url, req.method, req.headers.origin)
    // call next() in custom middleware or the app will stop working
    next()
})


/* ||  Applying Regular Middleware */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Allows React app to make HTTP requests to Backend
app.use(cors())

/* || Applying Authentication Middleware */
app.use(passport.initialize())

/* ||  Applying General Rules for CORS without corsConfig file */
app.options('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT')
    res.send(200)  
})


/* ||  Applying Sample Router */
app.use('/api/auth', authRouter)
app.use('/api/recipes', recipeRouter)


/* ||  Catch all for now */
app.all('*', (req, res) => {
    res.status(400).send('Error Occured')
})


/* ||  Listen to Requests on our Port */
app.listen(PORT, () => console.log(`Listening to our app on port ${PORT}`))