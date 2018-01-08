const path = require('path');
const webpack = require('webpack')
const electron = require('electron')

module.exports = {
  entry: './src/renderer/index.js',
  output: {
    filename: 'renderer.js',
    path: path.resolve(__dirname, 'app')
  },
  target: "electron-main"
};
