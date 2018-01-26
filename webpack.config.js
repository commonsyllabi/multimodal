const path = require('path');
const webpack = require('webpack')
const electron = require('electron')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
	  lesson:'./src/renderer/index.js',
	  create:'./src/renderer/create.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'app')
  },
  module: {
      loaders: [
          {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract('css-loader!sass-loader')
          }
      ]
  },
  plugins: [
      new ExtractTextPlugin('style.css', {
          allChunks: true
      })
  ],
  target: "electron-main"
};
