const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const database = require('knex')(config)

app.use(bodyParser.json());

app.use(express.static('public'));

app.set('port', process.env.PORT || 3000)

app.get('/', (request, response) => {
  response.sendFile('./index.html', {root: 'public' })
})

app.locals.title = 'Palette Picker'

app.locals.palettes = [
  {id: 1, name: 'project1', hex1: '12345', hex2: '23456', hex3: '345678', hex4: '45678', hex5: '56789', projectId: 1}
]

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then(projects => {
      response.status(200).json(projects)
    })
    .catch(error => {
      response.status(500).json({ error: error.message })
    })
})

app.get('/api/v1/projects/palettes', (request, response) => {
  database('palettes').select()
      .then(palettes => {
        response.status(200).json(palettes)
      })
      .catch(error => {
        response.status(500).json({ error: error.message })
      })
})




app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
});