const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsConfig = require('./webpack.config.isomorphic');
const path = require('path');

console.log('>>>>>>> webpack.config.prod.js > process.env.NODE_ENV <<<<<<<<: ', process.env.NODE_ENV);

// @import "~bootstrap-sass/assets/stylesheets/_bootstrap-sprockets.scss";
// $icon-font-path: '~bootstrap-sass/assets/fonts/bootstrap/';
// @import '~bootstrap-sass/assets/stylesheets/_bootstrap.scss';

module.exports = {
  devtool: 'source-map',

  entry: {
    app: [
      'eventsource-polyfill',
      'babel-polyfill',
      'isomorphic-fetch',
      path.join(__dirname, './client/assets/styles/global.scss'),
      path.join(__dirname, './client/index.js')
    ],
    vendor: ['react', 'react-dom', 'draft-js', 'react-draft-wysiwyg']
  },

  output: {
    path: path.join(__dirname, './public/static/dist/client'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/public/static/dist/client/'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: ['client', 'node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /(global\.css)$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap',
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]__[hash:base64:5]'
              }
            },
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                localIdentName: '[name]__[local]__[hash:base64:5]'
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader'
      },
      {
        test: /\.(ttf|eot)(\?[\s\S]+)?$/,
        use: 'file-loader'
      }
    ]
  },

  plugins: [
    new webpack.IgnorePlugin(/\/iconv-loader$/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        CLIENT: JSON.stringify(true)
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].[chunkhash].js'
    }),

    new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig),

    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css'
    }),

    new ManifestPlugin({
      basePath: '/'
    }),

    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest'
    }),

    new SWPrecacheWebpackPlugin({
      cacheId: 'gost',
      filename: 'sw.js',
      filepath: path.join(__dirname, './dist/sw.js'),
      staticFileGlobs: [path.join(__dirname, './public/static/dist/**/*')],
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      maximumFileSizeToCacheInBytes: 4194304,
      navigateFallback: 'index.html'
    })
  ]
};

/*
  {
    test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: 'url-loader'
  },
  {
    test: /\.(ttf|eot)(\?[\s\S]+)?$/,
    use: 'file-loader'
  }
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  }),
  {
    test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
    use: 'file-loader',
  },
*/
