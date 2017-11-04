const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

// webpack-isomorphic-tools is extensible,
// and finding the real paths for assets is the simplest example of what it can do inside require() calls. 
// Using custom configuration one can make require() calls (on the server) return anything
// (not just a String; it may be a JSON object, for example).

module.exports = {
  // debug: see debugging messages in the console.
  debug: true,
  // webpack_assets_file_path: webpack-assets.json is created by webpack-isomorphic-tools
  // webpack_assets_file_path: webpack-assets.json keeps track of the real paths to your assets
  webpack_assets_file_path: './webpack-assets.json',
  // assets:  define all asset types
  // keys of this object will appear in:
  //  * webpack-assets.json
  //  * .assets() method call result
  //  * .regularExpression(key) method call
  assets: {
    // images: which file types belong to this asset type
    images: {
      extensions: ['jpeg', 'jpg', 'png', 'gif', 'svg'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    fonts: {
      extensions: ['woff', 'woff2', 'eot', 'ttf'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    }
  },
  // if you're using Webpack's `resolve.modulesDirectories`
  // then you should also put them here.
  modulesDirectories: ['node_modules'],
  // enables support for `require.context()` and `require.ensure()` functions.
  // is turned off by default 
  // to skip unnecessary code instrumentation
  // because not everyone uses it.
  patch_require: false
};
