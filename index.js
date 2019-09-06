const express = require('express');
const bodyParser = require('body-parser');

const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

app.use(function (req, res, next) {
  res.set('Cache-Control', 'no-cache, no-store');
  next();
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json(req.headers);
  res.end();
});

/* for next build use
 *
app.get('/hello', (req, res) => {
  res.send('Hello world\n');
});
**/

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
