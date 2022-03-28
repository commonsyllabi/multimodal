const path = require('path');
const webpack = require('webpack')
const electron = require('electron')
const app = electron.app
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

//-- different target directories based on platforms
let targetPath = process.platform == 'linux' ?
  path.join(process.env.HOME, '.config/multimodal/app') :
  path.join('/Library/Application Support/multimodal/app')

module.exports = {
  mode: 'development',
  entry: {
	  topic:'./src/renderer/topic.js',
	  main:'./src/renderer/main.js'
  },
  output: {
    filename: '[name].js',
    path: targetPath
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
            loader: 'file-loader',
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
      new VueLoaderPlugin()
  ],
  target: "electron-main",
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
};
