const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvWebpack = require("dotenv-webpack")

module.exports = {
  entry: path.resolve(__dirname, '..', 'src', 'index'),
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        // es5 지원 필요가 없다면 babel-loader 대신 ts-loader 와 react 관련 loader 를 사용해야 함.
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, 'babel.conf.js'),
          },
        },
      },
      {
        test: /\.(ttf|woff|woff2|svg|ico|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './font/[name].[ext]',
            },
          },
        ],
      },
      {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'public', 'index.html'),
    }),
    new DotenvWebpack({
    }),
  ],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '..', 'src')],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.json'],
    alias: {
      resource: path.resolve(__dirname, '..', 'resource'),
    },
  },
  devServer: {
	client: {
		overlay: true,
	},
    host: '0.0.0.0',
    hot: true,
    open: true,
    historyApiFallback: {
        disableDotRule: true,
    },
	static: {
		directory: path.resolve(__dirname, 'public'),
	},
  },
};