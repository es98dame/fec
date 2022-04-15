const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './fec-client/src/index.jsx'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './fec-client/dist'),
  },
  module: {
    rules: [{ test: /\.jsx/, use: 'babel-loader' }, { test: /\.(png|jpe?g|gif)$/i, loader: 'file-loader' }],

  },
  resolve: { extensions: ['.js', '.jsx'] },
  watch: true,
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  },
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};
