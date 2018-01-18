const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const Dotenv = require('dotenv-webpack')

require('dotenv').config()

const srcPath = path.join(__dirname, 'src')
// TODO: This could be more modular and work independently of the other packages
const buildPath = path.resolve(__dirname, 'build')
const backendUrl = process.env.DEVSERVER_PROXY_URL || 'http://localhost:3000'

module.exports = {
  devtool: process.env.NODE_ENV === 'development'
    ? 'eval-source-map'
    : 'source-map',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'isomorphic-fetch',
    `${srcPath}/index.js`
  ],
  output: {
    path: buildPath,
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    overlay: true,
    proxy: {
      '/api': { target: backendUrl }
    }
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [ 'node_modules', srcPath ]
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      { test: /\.(png|jpg|gif|svg)$/, loader: 'file-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Taxicab'
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      // Disabling causes ETP to fallback and style-loader to inject CSS in
      // <head><style></head>, allowing hot reloading
      disable: process.env.NODE_ENV === 'development'
    }),
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    ...(process.env.NODE_ENV === 'production' ? [new UglifyJsPlugin()] : [])
  ]
}
