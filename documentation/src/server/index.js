const path = require('path');
const express = require('express');
const compression = require('compression');
const logger = require('morgan');
const fetch = require('isomorphic-fetch');

const app = express();

const clientRoot = path.resolve(process.cwd(), 'dist', 'client');
app.set('view engine', 'ejs');
app.set('views', clientRoot);
app.use(compression());

app.get('/proxy', (req, res) => {
  const { url } = req.query;
  if (!url) {
    res.sendStatus(400);
  } else {
    fetch(url).then(response => response.json()).then(data => {
      res.json(data);
    }).catch(() => {
      res.sendStatus(500);
    });
  }
});

const client = express.static(clientRoot, {
  maxAge: 3156000,
});

let port = 8080;
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../../webpack-client.config');

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    stats: 'errors-only',
    publicPath: config.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));

  app.use(logger('dev'));
  app.use(client);
  app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, file) => {
      if (err) {
        next(err);
        return;
      }

      res.set('content-type', 'text/html');
      res.send(file);
      res.end();
    });
  });
} else {
  port = 80;
}

app.listen(port, err => {
  if (err) {
    throw err;
  }

  console.log(`Started server on port ${port}`);
});
