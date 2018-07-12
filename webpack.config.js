var webpack = require('webpack');
var path = require('path');

// extract inline css
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// vendor bundle and code splitting
var CommonsChunkPlugin = require('./node_modules/webpack/lib/optimize/CommonsChunkPlugin');

// minify bundles
var UglifyJsPlugin = require('./node_modules/webpack/lib/optimize/UglifyJsPlugin');

/** 
 * ENV variables 
*/
var env = process.env.NODE_ENV;
var isProd = env === 'production';

module.exports = {
	entry: {
        index: './src/scripts/index.js',
	    page1: './src/scripts/page1.js',
        page2: './src/scripts/page2.js',
        vendor: ['mithril']
    },
	output: {
        path: path.join(__dirname, 'build'),
		filename: '[name].bundle.js'
    },
    devServer: {
	    inline: true,
        port: 3000
    },
    devtool: isProd ? false : 'source-map',
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: isProd ? ExtractTextPlugin.extract('style', 'css-loader!autoprefixer?browsers=last 2 versions!sass') : ExtractTextPlugin.extract('style', 'css-loader?sourceMap!autoprefixer?browsers=last 2 versions!sass?sourceMap')
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
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                        mimetype: 'application/font-woff',
                        name: "./src/fonts/[name].[ext]"
                    }
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.bundle.css'),
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
        })
    ]
};
