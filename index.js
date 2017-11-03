
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const webpackIsomorphicToolsConfig = require('./webpack.config.isomorphic');
const projectBasePath = require('path').resolve(__dirname, './');

console.log('>>>>>>> index.js > process.env.BOOTSTRAPRC_LOCATION <<<<<<<<: ', process.env.BOOTSTRAPRC_LOCATION);
console.log('>>>>>>> index.js > process.env.NODE_ENV <<<<<<<<: ', process.env.NODE_ENV);
console.log('>>>>>>> index.js > process.env.BABEL_DISABLE_CACHE <<<<<<<<: ', process.env.BABEL_DISABLE_CACHE);

if (process.env.NODE_ENV === 'production') {

  global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig).server(projectBasePath, () => {
    require('./build/server/server.bundle');
  });

} else {

  require('babel-register')({
    plugins: [
      ['babel-plugin-css-modules-transform', {
        preprocessCss: './loaders/sassLoader.js',
        generateScopedName: '[name]__[local]__[hash:base64:5]',
        extensions: ['.css', '.scss']
      }],
      ['babel-plugin-webpack-loaders', {
        config: './webpack.config.babel.js',
        verbose: true
      }],
      'babel-plugin-transform-es2015-modules-commonjs'
    ]
  });

  require('babel-polyfill');
  require('es6-promise').polyfill();
  require('isomorphic-fetch');

  global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig).server(projectBasePath, () => {
    require('./server/server');
  });
  
}

/*
require('babel-register')({
  plugins: [
    ['babel-plugin-webpack-loaders', {
      config: './webpack/webpack.config.babel.js',
      verbose: true
    }],
    'transform-es2015-modules-commonjs'
  ]
});

require('babel-polyfill');
require('es6-promise').polyfill();
require('isomorphic-fetch');

// prettier-ignore
if (process.env.NODE_ENV === 'production') {

  global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig).server(projectBasePath, () => {

    require('./build/server/server.bundle');

  });

} else {

// Babel polyfill to convert ES6 code in runtime
  global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig).server(projectBasePath, () => {

    require('./server/server');

  });
  
}
*/