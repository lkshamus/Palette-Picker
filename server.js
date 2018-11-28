const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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

app.get('/api/v1/palettes', (request, response) => {

})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
});