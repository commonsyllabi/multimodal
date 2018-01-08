const path = require('path');
const webpack = require('webpack')
const electron = require('electron')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/renderer/index.js',
  output: {
    filename: 'renderer.js',
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
