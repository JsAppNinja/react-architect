const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const StartServerPlugin = require('start-server-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const SWOfflinePlugin = require('./src/utils/SWOfflinePlugin');
const { name, homepage } = require('./package.json');

dotenv.config();
const src = path.resolve(__dirname, 'src');
const modules = path.resolve(__dirname, 'node_modules');
const clientEntry = path.join(src, 'client', 'index.jsx');
const serverEntry = path.join(src, 'server', 'index.js');
const clientDist = path.resolve(__dirname, 'public');
const serverDist = path.join(__dirname, 'dist');
const PUBLIC_URL = process.env.PUBLIC_URL || homepage;
const SERVICE_WORKER = 'service-worker.js';
const SSR = !!process.env.USE_SSR;
const HOT_RELOAD_PORT = process.env.HOT_RELOAD_PORT || 3001;
const POLL_ENTRY = 'webpack/hot/poll?1000';
const PRODUCTION_SUFFIX = '.[chunkhash:8].min';
const CLIENT_HOT_ENTRIES = [
  'react-hot-loader/patch',
  `webpack-dev-server/client?http://localhost:${HOT_RELOAD_PORT}`,
  'webpack/hot/only-dev-server',
];
const DEV_PLUGINS = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
];
const PROD_PLUGINS = [];
const CLIENT_DEV_PLUGINS = [];
const CLIENT_PROD_PLUGINS = [
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    mangle: {
      screw_ie8: true,
      keep_fnames: true,
    },
    compress: {
      screw_ie8: true,
      warnings: false,
    },
    comments: false,
    sourceMap: true,
  }),
  new ManifestPlugin(),
  new webpack.HashedModuleIdsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: ['chunks', 'manifest'],
    minChunks: Infinity,
  }),
  // Create the offline html fallback page to work with the service workers.
  new HtmlWebpackPlugin({
    filename: 'offline.html',
    inject: true,
    template: path.join(src, 'utils', 'serviceWorkerTemplate.ejs'),
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
    publicUrl: PUBLIC_URL,
  }),
  // Create a service worker for caching the static assets
  new SWPrecachePlugin({
    cacheId: name,
    // Skip hashing urls when it was already hashed by webpack
    dontCacheBustUrlsMatching: /\.\w{8}\./,
    filename: SERVICE_WORKER,
    minify: true,
    runtimeCaching: [{
      // Cache all the documentation server API calls or the custom themees that get created.
      urlPattern: new RegExp(`^${PUBLIC_URL}/(api|themes)`),
      handler: 'networkFirst',
    }, {
      // Cache all the external fonts/icons
      urlPattern: /^https:\/\/((cdnjs\.cloudflare)|(fonts\.(gstatic|googleapis))\.com)/,
      handler: 'networkFirst',
    }],
    mergeStaticsConfig: true,
    // Include the additional offline service worker hooks to redirect to the
    // offline.html page if the user has no internet connection.
    // Ideally this would use the `chunkName` of `offline` and not require the second plugin,
    // but since the manifest is extracted, it sort of breaks :/
    importScripts: [{ filename: `offline-${SERVICE_WORKER}` }],
    // Skip caching big files
    staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/],
  }),
  // Create the 'offline-service-worker.js' file that gets imported by the
  // main service worker. This creates an alternative offline html page to
  // use when there is no connection.
  new SWOfflinePlugin({
    cacheId: name,
    entry: path.join(src, 'offline.js'),
    filename: `offline-${SERVICE_WORKER}`,
  }),
];
const SERVER_DEV_PLUGINS = [
  new StartServerPlugin({
    name: 'server.js',
    nodeArgs: [
      // '--inspect', // allow node debugging for the server
      '-r', 'dotenv/config', // before starting, run dotenv.config
    ],
  }),
];
const SERVER_PROD_PLUGINS = [];


function makeConfig(server, production) {
  let publicUrl = PUBLIC_URL;
  if (!production && PUBLIC_URL === homepage) {
    publicUrl = '';
  }

  let dist;
  let entry;
  let target;
  let externals;
  let filename;
  let chunkFilename;
  let nodeTargets;
  let browserTargets;
  let devServer;
  const babelPlugins = [];
  const additionalPlugins = [];
  const additionalLoaders = [];
  if (server) {
    const whitelist = [/prismjs.*\.css$/, /webpack-assets\.json$/];
    if (!production) {
      whitelist.push(POLL_ENTRY);
    }

    dist = serverDist;
    entry = production ? serverEntry : [POLL_ENTRY, serverEntry];
    externals = [nodeExternals({ whitelist })];
    filename = 'server.js';
    target = 'node';
    nodeTargets = '6';
    additionalPlugins.push(
      new webpack.NormalModuleReplacementPlugin(/\.s?css$/, 'node-noop'),
      ...(production ? SERVER_PROD_PLUGINS : SERVER_DEV_PLUGINS)
    );
  } else {
    const extractStyles = new ExtractTextPlugin({
      filename: `styles${PRODUCTION_SUFFIX}.css`,
      allChunks: true,
      disable: !production,
    });
    dist = clientDist;
    entry = production ? clientEntry : [...CLIENT_HOT_ENTRIES, clientEntry];
    filename = `[name]${production ? PRODUCTION_SUFFIX : ''}.js`;
    chunkFilename = `[name]${production ? PRODUCTION_SUFFIX : ''}.js`;
    browserTargets = ['last 2 versions', 'safari >= 7'];
    additionalPlugins.push(
      extractStyles,
      new AssetsPlugin(),
      ...(production ? CLIENT_PROD_PLUGINS : CLIENT_DEV_PLUGINS)
    );
    additionalLoaders.push({
      // Loading css dependencies from dependencies (normalize.css and Prism.css)
      test: /\.css$/,
      loader: extractStyles.extract({
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 1,
          },
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        }],
        fallback: 'style-loader',
      }),
    }, {
      test: /\.scss$/,
      include: src,
      loader: extractStyles.extract({
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 2,
          },
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            outputStyle: !production ? 'expanded' : 'compressed',
          },
        }],
        fallback: 'style-loader',
      }),
    });
    babelPlugins.push('react-hot-loader/babel');
    devServer = {
      host: 'localhost',
      port: HOT_RELOAD_PORT,
      historyApiFallback: true,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }

  const envPresetTargets = {};
  if (browserTargets) {
    envPresetTargets.browsers = browserTargets;
  }

  if (nodeTargets) {
    envPresetTargets.node = nodeTargets;
  }

  const routesName = !server && production ? 'async' : 'sync';
  let publicPath = `${publicUrl}/`;
  if (!production && !server && publicPath === '/') {
    publicPath = `http://localhost:${HOT_RELOAD_PORT}${publicPath}`;
  }

  return {
    bail: production,
    cache: !production,
    devtool: production ? 'source-map' : 'cheap-module-eval-source-map',
    devServer,
    entry,
    target,
    externals,
    output: {
      path: dist,
      publicPath,
      filename,
      chunkFilename,
    },
    module: {
      rules: [{
        enforce: 'pre',
        test: /\.jsx?$/,
        include: src,
        loader: 'eslint-loader',
      }, {
        test: /\.jsx?$/,
        include: src,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ['env', {
              targets: envPresetTargets,
              modules: false,
              loose: true,
            }],
            'react',
            'stage-0',
          ],
          plugins: [
            ...babelPlugins,
            'lodash',
          ],
        },
      }, {
        test: /\.md$/,
        include: src,
        loader: 'raw-loader',
      }, {
        test: /\.json$/,
        include: src,
        loader: 'json-loader',
      }, {
        test: /\.(woff2?|ttf|eot)$/,
        include: src,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
          },
        }],
      }, {
        test: /\.svg$/,
        include: path.join(src, 'icons'),
        use: [{
          loader: 'svg-sprite-loader',
          options: {
            extract: true,
            spriteFilename: 'icon-sprites.[hash:8].svg',
          },
        }, {
          loader: 'svgo-loader',
        }],
      }, {
        test: /\.(png|jpe?g|gif|svg)/,
        include: src,
        exclude: /icons/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
          },
        }, {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
          },
        }],
      }, ...additionalLoaders],
    },
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/^routes$/, `routes/${routesName}.js`),
      new webpack.NormalModuleReplacementPlugin(/^\.\/routes$/, `./${routesName}.js`),
      new webpack.NormalModuleReplacementPlugin(/^\.\/render$/, `./render.${SSR || production ? 'ssr' : 'dev'}.jsx`),
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            failOnError: true,
          },
          debug: !production,
        },
      }),
      new webpack.DefinePlugin({
        PUBLIC_URL: JSON.stringify(publicUrl),
        __NGINX__: !!process.env.USE_NGINX,
        __DEV__: !production,
        __CLIENT__: !server,
        __SSR__: SSR,
        'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
      }),
      new SpriteLoaderPlugin(),
      ...additionalPlugins,
      ...(production ? PROD_PLUGINS : DEV_PLUGINS),
    ],
    resolve: {
      alias: {
        'globals': path.join(src, '_globals.scss'),
        'react-md': path.resolve(__dirname, '..'),
        'react': path.join(modules, 'react'),
        'react-dom': path.join(modules, 'react-dom'),
      },
      extensions: ['.js', '.jsx'],

      // resolve dependencies first and then files in src. Allows for
      // import Something from 'components/Something' instead of '../../../../compoennts/Something'
      modules: ['node_modules', 'src'],
    },
    stats: 'errors-only',
  };
}

module.exports = ({ production, server }) => {
  const config = makeConfig(server, production);
  if (production) {
    return [config, makeConfig(!server, production)];
  }

  return config;
};
