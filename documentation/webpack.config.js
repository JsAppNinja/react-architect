/* eslint-disable quote-props */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const nodeModules = path.resolve(process.cwd(), 'node_modules');
const shared = path.resolve(process.cwd(), 'src', 'shared');
module.exports = () => ({
  __htmlWebpackOptions: {
    filename: 'index.ejs',
    inject: false,
    template: path.resolve(process.cwd(), 'src', 'template.js'),
    favicon: path.resolve(process.cwd(), 'src', 'client', 'favicon.ico'),

    title: 'react-md',
    appMountId: 'app',
    isomorphic: 'html',
    isomorphicState: {
      var: '__INITIAL_STATE__',
      val: 'initialState',
    },
    isomorphicHtmlClassName: 'htmlClassName',
    description: 'Google\'s Material Design UI components built with React and sass.',
    keywords: 'material design,react,sass,material,ui,components,material-design',
  },

  __imgLoader: (loader) => ({
    test: /\.(png|jpe?g)$/,
    exclude: /node_modules/,
    loader: `${loader}?name=imgs/[hash].[ext]!image-webpack`,
  }),

  eslint: {
    configFile: path.resolve(process.cwd(), '.eslintrc'),
  },

  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules|lib/,
      loader: 'eslint',
    }],

    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
    }, {
      test: /\.(md|svg)$/,
      exclude: /node_modules/,
      loader: 'raw',
    }, {
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json',
    }],
  },

  output: {
    publicPath: '/',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      // prevents multiple react versions when linked
      'react': path.join(nodeModules, 'react'),
      'react-dom': path.join(nodeModules, 'react-dom'),
      'react-motion': path.join(nodeModules, 'react-motion'),
      'react-md': path.resolve(process.cwd(), '..'),
      'react-md-scss': path.resolve(process.cwd(), '..', 'src', 'scss', '_react-md.scss'),

      'actions': path.join(shared, 'actions'),
      'constants': path.join(shared, 'constants'),
      'components': path.join(shared, 'components'),
      'containers': path.join(shared, 'containers'),
      'readmes': path.join(shared, 'readmes'),
      'reducers': path.join(shared, 'reducers'),
      'routes': path.join(shared, 'routes'),
      'stores': path.join(shared, 'stores'),
      'utils': path.join(shared, 'utils'),
    },

    fallback: nodeModules, // So that dependencies fall back to this node modules
  },

  resolveLoader: {
    fallback: nodeModules, // So that dependencies fall back to this node modules
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      minChunks: 3,
    }),
  ],

  postcss() {
    return [autoprefixer({ browsers: ['last 2 version'] })];
  },
});
