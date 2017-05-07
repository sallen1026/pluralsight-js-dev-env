import path from 'path';
import webpack from 'webpack';  // we need to add this import since we're now calling some webpack specific features
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  // for  Prod, we changed from inline-source-map to source-map to get the most info; it's slower to build,
  // but provides the highest quality source-map experience
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    // here we changed out output from src to dist
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
      // Generate an external css file with a hash in the filename
      new ExtractTextPlugin('[name].[contenthash].css'),

      // Hash the files using MD5 so that their names change when their content changes
      new WebpackMd5Hash(),

      // Use CommonsChunkPlugin to create a separate bundle
      // of vendor libraries so that they're cached separately
      new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor'
      }),

      // Create HTML file that includes reference to bundled JS
      new HtmlWebpackPlugin({
          template: 'src/index.html',
          minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
          },
          inject: true
      }),

      // Eliminate duplicate packages when generating bundle
      new webpack.optimize.DedupePlugin(),

      // Minify JS
      new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
