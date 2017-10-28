const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function getStyleLoader(isServer, isProd, postcssParser) {
	const loader = [
		{
			loader: `css-loader${isServer ? '/locals' : ''}`,
			options: {
				localIdentName: `${!isProd ? '[local]_' : ''}[hash:base64:5]`,
				modules: true,
				importLoader: 1,
				camelCase: true
			}
		},
		{
			loader: 'postcss-loader',
			options: {
				parser: postcssParser,
				plugins: [
					require('precss'),
					require('postcss-cssnext'),
					require('postcss-flexbugs-fixes'),
					require('postcss-focus'),
					require('postcss-utilities')
				]
			}
		}
	]

	return isProd
		? ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: loader
		})
		: [{ loader: 'style-loader' }, ...loader]
}

module.exports = options => ({
	entry: options.entry,
	output: Object.assign(
		{
			path: path.resolve(process.cwd(), 'build'),
			publicPath: ''
		},
		options.output
	),
	module: {
		rules: [
			{
				test: /\.css$/,
				loaders: getStyleLoader(false, options.isProd)
			}, {
				test: /\.sss$/,
				loaders: getStyleLoader(false, options.isProd, 'sugarss')
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				include: [
					path.join(process.cwd(), 'src')
				],
				exclude: /node_modules/,
				query: {
					cacheDirectory: true
				}
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file-loader'
			}
		]
	},
	plugins: options.plugins.concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.LoaderOptionsPlugin({
			minimize: options.isProd,
			options: {
				context: path.join(process.cwd(), 'src')
			}
		})
	]),
	resolve: {
		extensions: [
			'.js',
			'.jsx',
			'.graphql',
			'.gql'
		],
		alias: {
			'@components': path.resolve(process.cwd(), 'src/components')
		}
	},
	devtool: options.devtool,
	target: 'web',
	performance: options.performance || {}
})
