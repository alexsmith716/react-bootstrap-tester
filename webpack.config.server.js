// prettier-ignore
const fs = require('fs');
const path = require('path');
// externals - modules that should not be bundled
// When bundling for the backend you don't want to bundle node_modules dependencies
// "webpack-node-externals": exclude node modules in Webpack
const nodeExternals = require('webpack-node-externals');

console.log(
  '>>>>>>> webpack.config.server.js > process.env.BOOTSTRAPRC_LOCATION <<<<<<<<: ',
  process.env.BOOTSTRAPRC_LOCATION
);
console.log(
  '>>>>>>> webpack.config.server.js > process.env.NODE_ENV <<<<<<<<: ',
  process.env.NODE_ENV
);

module.exports = {
  entry: path.join(__dirname, './server/server.js'),

  output: {
    path: path.join(__dirname, './build/server'),
    filename: 'server.bundle.js',
    publicPath: '/build/server/'
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: true
  },

  // "importType"
  //    The method in which unbundled modules will be required in the code
  //    "commonjs" for node modules

  externals: [nodeExternals({ importType: 'commonjs' })],

  // "Babel-loader" presets/plugins take precedence over .babelrc
  // https://gist.github.com/rmoorman/94eeed830942758e218d92f15ce58d88
  // Plugin ordering is first to last

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          cacheDirectory: false,
          presets: ['react', ['es2015', { modules: false }], 'stage-0'],
          plugins: [
            [
              'babel-plugin-css-modules-transform',
              {
                preprocessCss: './loaders/sassLoader.js',
                generateScopedName: '[name]__[local]__[hash:base64:5]',
                extensions: ['.css', '.scss']
              }
            ],
            'babel-plugin-transform-decorators-legacy',
            [
              'babel-plugin-webpack-loaders',
              {
                config: './webpack.config.babel.js',
                verbose: false
              }
            ]
          ]
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};

/*
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          passPerPreset: true,
          presets: ['react', ['es2015', { modules: false }], 'stage-0'],
          plugins: [
            ['babel-plugin-css-modules-transform', {
              preprocessCss: './loaders/sassLoader.js',
              generateScopedName: '[name]__[local]__[hash:base64:5]',
              extensions: ['.css', '.scss']
            }],
            'babel-plugin-transform-decorators-legacy',
            ['babel-plugin-webpack-loaders', {
              config: './webpack.config.babel.js',
              verbose: false
            }],
            'babel-plugin-transform-es2015-modules-commonjs',
          ]
        }
      }
*/
