require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const indexControllers = require('./controllers/index');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(compression());

// Adds `.body` in the request
app.use(bodyParser.json({ extended: false }));

app.use('/api', indexControllers);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './build')));

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
