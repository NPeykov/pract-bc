const webpack = require('webpack')
const path = require('path')

const config = (env, argv) => {

	const backend_url = argv.mode === 'production' ? 
		'https://salty-bastion-66990.herokuapp.com/notes'
		: 
		'http://localhost:3002/notes'
	return {	
		entry: ['@babel/polyfill', './src/index.js'],
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: 'main.js'
		},
		devServer: {
			static: { directory: path.resolve(__dirname, 'build') },
			compress: true,
			port: 3000
		},
		devtool: "source-map",
		module: { 
			rules: [
				{ 
					test: /\.js$/, 
					loader: 'babel-loader', 
					options: { 
						presets: ['@babel/preset-env', '@babel/preset-react'], 
					}, 
				},
				{ 
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				},
			], 
		},
		plugins: [
			new webpack.DefinePlugin({
				BACKEND_URL: JSON.stringify(backend_url)
			})
		]
	}
}
module.exports = config
