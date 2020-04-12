require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const indexControllers = require('./controllers/index');

const app = express();
const PORT = process.env.PORT || 8000;

// adds `.body` in the request
app.use(compression());
app.use(bodyParser.json({ extended: false }));

app.use('/api', indexControllers);

if (process.env.NODE_ENV === 'production') {
  const DIST_DIR = path.join(__dirname, 'dist');
  const HTML_FILE = path.join(DIST_DIR, 'index.html');

  app.use(express.static(DIST_DIR));

  app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
  })
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
