const path = require('path');
const slsw = require('serverless-webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  entry: slsw.lib.entries,
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.ts',
      '.tsx'
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    loaders: [
      { test: /\.ts(x?)$/, loader: 'ts-loader' },
    ],
  },
  devtool: 'source-map',
  plugins: getPlugins(),
};

function getPlugins() {
  const defaultPlugins = [];
  if(production) {
    return defaultPlugins.concat([
      new UglifyJSPlugin({
        sourceMap: true,
      }),
    ]);
  } else {
    return defaultPlugins;
  }
}
