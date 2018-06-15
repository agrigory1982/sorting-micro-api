'use strict';

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

let nodeModules = {};

fs.readdirSync('node_modules')
  .filter((x) => {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const config = {
  entry: './index.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'api.prod.js'
  },
  mode: 'production',
  externals: nodeModules
};

config.plugins = [];

config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': `"production"`
  }
}));

module.exports = config;