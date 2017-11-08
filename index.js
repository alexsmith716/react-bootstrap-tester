const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

// this global variable will be used later in express middleware
const webpackIsomorphicToolsConfig = require('./webpack.config.isomorphic');

// this must be equal to your Webpack configuration "context" parameter
const projectBasePath = require('path').resolve(__dirname, './');

console.log(
  '>>>>>>> index.js > process.env.BOOTSTRAPRC_LOCATION <<<<<<<<: ',
  process.env.BOOTSTRAPRC_LOCATION
);
console.log(
  '>>>>>>> index.js > process.env.NODE_ENV <<<<<<<<: ',
  process.env.NODE_ENV
);
console.log(
  '>>>>>>> index.js > process.env.BABEL_DISABLE_CACHE <<<<<<<<: ',
  process.env.BABEL_DISABLE_CACHE
);

if (process.env.NODE_ENV === 'production') {
  global.webpackIsomorphicTools = new WebpackIsomorphicTools(
    webpackIsomorphicToolsConfig
  ).server(projectBasePath, () => {
    require('./build/server/server.bundle');
  });
} else {
  // "Babel-register" IS A WAY OF USING Babel
  // So, "Babel-register" presets/plugins will take precedence over .babelrc
  // "Babel-register": binds Babel to Node's require() to compile files on the fly
  // Hot-Loading handled here !!!
  // server-side processing of client requests
  // server-side es6 code must be compiled to client-friendly es5 code
  // these Hot-Loading requests are on-the-fly and therefore useful in dev mode only
  // all files required by node with the extensions .es6, .es, .jsx and .js are transformed by Babel
  // You must include the polyfill separately when using features that require it, like generators
  // By default all requires to node_modules will be ignored
  // BABEL_DISABLE_CACHE=1: Disables the cache (thus enabling Hot-Loading)
  // "babel-plugin-css-modules-transform": finds all `require`s for css module files and replaces them
  // with a hash where keys are class names and values are generated css class names

  // the closest ".babelrc" to each file applies, and takes precedence over any options passed in "babel-register"
  // By default "babel-register" will save to a json cache in your temporary directory
  // "BABEL_DISABLE_CACHE=1" will disable cache

  require('babel-register')({
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
          verbose: true
        }
      ],
      'babel-plugin-transform-es2015-modules-commonjs'
    ]
  });

  require('babel-polyfill');
  require('es6-promise').polyfill();
  require('isomorphic-fetch');

  global.webpackIsomorphicTools = new WebpackIsomorphicTools(
    webpackIsomorphicToolsConfig
  ).server(projectBasePath, () => {
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
