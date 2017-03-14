// const Server = require('./server');
const path = require('path');
const express = require('express');
const cors = require('express-cors');
var bodyParser = require('body-parser')
const port = (process.env.PORT || 3000);
const app = express();
const users = require('./users');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/js', express.static(__dirname + '/js'));
app.use('/bower_components', express.static(__dirname + '/../bower_components'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/partials', express.static(__dirname + '/partials'));

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname });
});

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../webpack.config.js');
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
}

app.use('/assets', express.static(path.join(__dirname, '../app/assets')));

app.get('/', function (req, res) { res.sendFile(path.join(__dirname, '/../index.html')) });

app.use('/api', users);
app.get('*', function (req, res) { res.sendFile(path.join(__dirname, '/../index.html')) });

app.listen(port);

console.log(`Listening at http://localhost:${port}`);
