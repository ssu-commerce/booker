const path = require('path');
const config = require('./webpack.conf.js');

module.exports = {
  ...config,
  mode: 'development',
  module: {
    rules: [
      ...config.module.rules,
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '..', '.tmp'),
    filename: 'index.js',
  },
};