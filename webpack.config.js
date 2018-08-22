const path = require('path');
const webpack = require('webpack')
const electron = require('electron')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
	  lesson:'./src/renderer/lesson.js',
	  main:'./src/renderer/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'src/app')
  },
  module: {
      loaders: [
          {
              test: /\.scss$/,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
              })
          },
          {
          test: /\.(woff2?|ttf|otf|eot|svg)$/,
          exclude: /node_modules/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
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
