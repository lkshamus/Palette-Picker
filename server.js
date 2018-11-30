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

app.post('/api/v1/projects', (request, response) => {

  const project = request.body

  for(let requiredParam of ['title']) {
    if(!paper[requiredParam]) {
      response.status(422).json({ error: 'Missing required param' })
    }
  }

  database('projects').insert(project, 'id')
    .then(projectIds => {
      response.status(201).json({ id: projectIds[0] })
    })
    .catch(error => {
      response.status(500).json({ error: error.message })
    })
})

app.get('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params

  database('projects').where('id', id).select()
    .then(project => response.status(200).json(project))
    .catch(error => console.log(`Error fetching project: ${error.message}`))
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