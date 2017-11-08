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

  // only with "babelrc: false" will "Babel-loader" take precendance over ".babelrc"
  // below "babel-loader" has "babelrc: true"
  // "babelrc: true": so any ".babelrc" presets && plugins will override listed "babel-loader" presets && plugins
  // removed "babel-plugin-transform-decorators-legacy" since handled in ".babelrc"
  // config below appears to be working

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            [
              'babel-plugin-css-modules-transform',
              {
                preprocessCss: './loaders/sassLoader.js',
                generateScopedName: '[name]__[local]__[hash:base64:5]',
                extensions: ['.css', '.scss']
              }
            ],
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

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
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
            }]
          ]
        }
      },
*/
