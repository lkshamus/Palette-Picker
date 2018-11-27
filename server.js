const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('public'));

app.set('port', process.env.PORT || 3000)

app.get('/', (request, response) => {
  response.sendFile('./index.html', {root: 'public' })
})

app.listen(app.get('port'), () => {
  console.log(`The HTTP server is running on ${app.get('port')}`);
});