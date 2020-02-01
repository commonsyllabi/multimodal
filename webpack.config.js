const path = require('path');
const webpack = require('webpack')
const electron = require('electron')
const app = electron.app
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
	  topic:'./src/renderer/topic.js',
	  main:'./src/renderer/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'src/app')
    //path: '/home/pierre/.config/multimodal/app'
  },
  module: {
      rules: [
          {
              test: /\.scss$/,
              use: ['vue-style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
          },
          {
            test: /\.(woff|ttf|otf|eot|svg)$/,
            exclude: /node_modules/,
            loader: 'url-loader',
            options: {
              limit: 50000,
              name: 'fonts/[name].[ext]'
            },
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          }
      ]
  },
  plugins: [
      new ExtractTextPlugin('style.css', {
          allChunks: true
      }),
      new VueLoaderPlugin()
  ],
  target: "electron-main",
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
};
