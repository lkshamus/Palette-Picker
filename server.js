const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const database = require('knex')(config)

app.use(bodyParser.json());

//this allows us to serve up static files
app.use(express.static('public'));

//this tells which port to run the server on
app.set('port', process.env.PORT || 3000)

//this is how our html comes up in the browser when connected to the server
app.get('/', (request, response) => {
  response.sendFile('./index.html', {root: 'public' })
})

//gives a temporary titled name
app.locals.title = 'Palette Picker'

//handles get request to return projects information 
app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then(projects => {
      response.status(200).json(projects)
    })
    .catch(error => {
      response.status(500).json({ error: error.message })
    })
})

//handles get request to return palettes information 
app.get('/api/v1/projects/palettes', (request, response) => {
  database('palettes').select()
      .then(palettes => {
        response.status(200).json(palettes)
      })
      .catch(error => {
        response.status(500).json({ error: error.message })
      })
})


//handles post to database to add new projects
app.post('/api/v1/projects', (request, response) => {

  const project = request.body

  for(let requiredParam of ['title']) {
    if(!project[requiredParam]) {
      response.status(422).json({ error: 'Missing required param test' })
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

// handles post to palette database to add more palettes
app.post('/api/v1/projects/palettes', (request, response) => {

  const palette = request.body

  for(let requiredParam of ['title']) {
    console.log('required param', requiredParam)
    if(!palette[requiredParam]) {
      response.status(422).json({ error: 'Missing required param' })
    }
  }

  database('palettes').insert(palette, 'id')
    .then(paletteIds => {
      response.status(201).json({ id: paletteIds[0] })
    })
    .catch(error => {
      response.status(500).json({ error: error.message })
    })
})

//handles get request to return particular project
app.get('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params

  database('projects').where('id', id).select()
    .then(project => response.status(200).json(project))
    .catch(error => console.log(`Error fetching project: ${error.message}`))
})

//handles get request to return palette info
app.get('/api/v1/projects/palettes', (request, response) => {
  database('palettes').select()
    .then(palettes => {
      response.status(200).json(palettes)
    })
    .catch(error => {
      response.status(500).json({ error: error.message })
    })
})


//waits for app to connect to port and send message when running
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
});