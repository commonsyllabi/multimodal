const path = require('path');
const webpack = require('webpack')
const electron = require('electron')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const PATHS = {
  build: path.join(__dirname, './src/app')
}

module.exports = {
  entry: {
	  lesson:'./src/renderer/lesson.js',
	  main:'./src/renderer/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'src/app'),
    publicPath: PATHS.build
  },
  module: {
      loaders: [
          {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract('css-loader!sass-loader')
          },
          {
              test: /\.(eot|svg|ttf|woff|woff2)$/,
              loader: 'file-loader?name=fonts/[name].[ext]'
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
