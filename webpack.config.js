const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './fec-client/src/index.jsx'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './fec-client/dist'),
  },
  module: {
    rules: [{ test: /\.jsx/, use: 'babel-loader' }],
  },
  resolve: { extensions: ['.js', '.jsx'] },
  watch: true,
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  }
};
