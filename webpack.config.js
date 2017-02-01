var path = require('path');
var webpack = require('webpack');
var glob = require("glob");

module.exports = {
  entry: {
      "angular-jsonapi": glob.sync("./src/**/*.js"),
      "angular-jsonapi.min": glob.sync("./src/**/*.js")
  },
  module: {
    /*loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]*/
  },
  output: {
    filename: '[name].js',
    chunkFilename: 'chunks/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/
    })
  ]
};