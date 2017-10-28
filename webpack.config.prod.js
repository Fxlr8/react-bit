const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const baseConfig = require('./webpack.config.base')

module.exports = baseConfig({
	isServer: true,
	isProd: true,
	devtool: 'source-map',
	entry: [path.join(__dirname, 'src/main.js')],
	output: {
		filename: '[name]-[hash].min.js'
	},
	plugins: [
		new ExtractTextPlugin({
			filename: '[name].[hash].min.css',
			disable: false,
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.tpl.html',
			inject: 'body',
			filename: 'index.html',
			minify: {
				collapseWhitespace: true,
				minifyCSS: true
			}
		}),
		new CopyWebpackPlugin([{
			from: 'src/assets'
		}])
	]
})
