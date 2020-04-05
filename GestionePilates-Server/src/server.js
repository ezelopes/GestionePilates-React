const express = require('express');
const bodyParser = require('body-parser');
const indexControllers = require('../controllers/index');
// import path from 'path';

const app = express();

app.use(bodyParser.json({ extended: false })); // adds `.body` in the request

app.use('/api', indexControllers);

// app.use(express.static(path.join(__dirname, '/build')));

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
