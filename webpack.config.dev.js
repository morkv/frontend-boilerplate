const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './source/assets/js/main.js',
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, 'public', 'js')
  },
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ]
};
