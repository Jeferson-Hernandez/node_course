require('dotenv').config()
const express = require('express')
const hbs = require('hbs');

const app = express()
const port = process.env.PORT 

// Handlebars
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials');

// Servir contenido estatico
app.use( express.static('public') )

app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'Jeferson Hernandez',
        titulo: 'Curso de Node'
    })
})

app.get('/generic', (req, res) => {
    res.render('generic', {
        nombre: 'Jeferson Hernandez',
        titulo: 'Curso de Node - Generic'
    })
})

app.get('/elements', (req, res) => {
    res.render('elements', {
        nombre: 'Jeferson Hernandez',
        titulo: 'Curso de Node - Elements'
    })
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html')
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})