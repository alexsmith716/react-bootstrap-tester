
let cssModulesIdentName = '[name]__[local]__[hash:base64:5]';
if (process.env.NODE_ENV === 'production') {
  cssModulesIdentName = '[hash:base64]';
}

console.log('>>>>>>>> webpack.config.babel.js <<<<<<<<<<<<<<');

module.exports = {

  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['client', 'node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file-loader',
      },
    ]
  }
};

/*
  {
    test: /\.css$/,
    loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]' + '!postcss-loader',
  },
  {
    test: /\.scss$/,
    loader: 'style-loader!css-loader?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]' + '!postcss-loader' + '!sass-loader',
  },
*/