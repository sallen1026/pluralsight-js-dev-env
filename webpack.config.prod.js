import path from 'path';
import webpack from 'webpack';  // we need to add this import since we're now calling some webpack specific features
import HtmlWebpackPlugin from 'html-webpack-plugin';

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
    filename: '[name].js'
  },
  plugins: [
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
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
