import path from 'path';
import webpack from 'webpack';

export default {
  debug: true,
  // for  Prod, we changed from inline-source-map to source-map to get the most info; it's slower to build, but worth it
  devtool: 'source-map',
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    // here we changed out output from src to dist
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
      // Eliminate duplicate packages when generating bundle
      new webpack.optimize.DedupePlugin(),
      // Minify JS
      new webpack.optimize.UglifyJSPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
