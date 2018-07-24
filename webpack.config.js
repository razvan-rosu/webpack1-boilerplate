const webpack = require('webpack');
const path = require('path');

// extract inline css
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// vendor bundle and code splitting
const CommonsChunkPlugin = require('./node_modules/webpack/lib/optimize/CommonsChunkPlugin');

// minify bundles
const UglifyJsPlugin = require('./node_modules/webpack/lib/optimize/UglifyJsPlugin');

// dynamicly insert hashed bundles into page template
const HtmlWebpackPlugin = require('html-webpack-plugin');

// resources gzip compression
const CompressionPlugin = require("compression-webpack-plugin");

// bundle performance debugger
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


/**
 * ENV variables
 */
const env = process.env.NODE_ENV;
const isDev = env === 'development';
const isProd = env === 'production';
const debugProd = env === 'debugproduction';


module.exports = {
	entry: {
    app: [
      './src/styles/master.scss',
      './src/scripts/index.js'
    ],
    playground: './src/scripts/pages/playground.js',
    spa: './src/scripts/pages/spa.js',
    vendor: ['mithril']
  },
	output: {
    path: path.join(__dirname, 'build'),
		filename: '[name].bundle.[chunkhash:4].js'
  },
  devServer: {
    inline: true,
    port: 3000,
    proxy: {},
  },
  devtool: isProd ? false : 'source-map',
  module: {
    loaders: [
      {
        test: /\.s[ac]ss$/,
        loader: (isProd || debugProd) ? ExtractTextPlugin.extract('style', 'css-loader!autoprefixer?browsers=last 2 versions!sass') : ExtractTextPlugin.extract('style', 'css-loader?sourceMap!autoprefixer?browsers=last 2 versions!sass?sourceMap')
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        use: {
          options: {
            mimetype: 'application/font-woff',
            name: "./src/fonts/[name].[ext]"
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].min.[contenthash:4].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: Infinity
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false,
          drop_console: false
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: 'index.html',
      chunks: ['vendor', 'app']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'playground.html'),
      filename: 'src/pages/playground.html',
      chunks: ['vendor', 'app', 'playground']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'spa.html'),
      filename: 'src/pages/spa.html',
      chunks: ['vendor', 'app', 'spa']
    })
  ]
};


/**
 * diverse ENV usecases
 */

// bundle performance visualizer
(isDev || debugProd) ? module.exports.plugins.push(new BundleAnalyzerPlugin()) : '';

// proxy http requests
if (isDev || debugProd) {
  const proxy = {
    '/users': {
      target: 'http://localhost:3000',
      pathRewrite: { '^/users': '/mockdata/users.json' },
    }
  }

  module.exports.devServer.proxy = proxy;
}

// resources gzip compression
if (isProd || debugProd) {
  module.exports.plugins.push(
    new CompressionPlugin({
      asset : "[path].gz[query]",
      algorithm : "gzip",
      test : /\.js$|\.css$|\.html$/,
      threshold : 10240,
      minRatio : 0.8
    })
  )
};
