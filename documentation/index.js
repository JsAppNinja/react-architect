/* eslint-disable global-require */
require('babel-core/register');
require('babel-polyfill');
require('dotenv').config();
const fs = require('fs');
const hacker = require('require-hacker');

const RAW_LOADER = '!!raw-loader!./';

/**
 * Need access to the manual code-sourcing with the raw-loader when doing ssr. I don't
 * feel like having to compile and generate all the pure text files each time it starts,
 * so just use the require-hacker like webpack-isomorphic-tools does with the static file
 * assets.
 *
 * When using the raw-loader, you **must** specify the file extension as well to get it to work.
 */
hacker.global_hook('raw-loader', (path, module) => {
  if (path.indexOf(RAW_LOADER) === -1) {
    return undefined;
  }

  const folder = module.filename.substring(0, module.filename.lastIndexOf('/'));
  const filePath = `${folder}/${path.replace(RAW_LOADER, '')}`;
  return {
    source: `module.exports = ${JSON.stringify(fs.readFileSync(filePath, 'UTF-8'))};`,
    path,
  };
});

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

global.__DEV__ = process.env.NODE_ENV === 'development';
global.__CLIENT__ = false;
global.__SSR__ = !global.__DEV__;
global.__SERVER_ONLY = false; // for debuggin/implementing api routes

const ROOT_DIR = require('path').resolve(process.cwd());

global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./WIT.config'))
  .server(ROOT_DIR, () => {
    require('./src/server');
  });
