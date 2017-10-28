const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webPackConfig = require('./webpack.config.dev')
const compiler = webpack(webPackConfig)
const webServerConfig = {
	publicPath: webPackConfig.output.publicPath,
	hot: true,
	historyApiFallback: true,
	stats: {
		colors: true,
		hash: false,
		timings: true,
		chunks: false,
		chunkModules: false,
		modules: false
	}
}
const port = 3000

const server = new WebpackDevServer(compiler, webServerConfig)

server.listen(port)
console.info('Listening on port %s', port) //eslint-disable-line
