
const path = require('path');
const webpack = require('webpack');  //eslint-disable-line
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //eslint-disable-line

module.exports = {
	entry: {
		vendor: [
			'vue/dist/vue.esm.js',
			'vue-router',
			'vuex',
			'element-ui',
			'element-ui/lib/theme-chalk/index.css',
		],
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader'],
			}),
		}, {
			test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'fonts/',
					publicPath: '../',
				},
			}],
		}],
	},
	output: {
		path: path.join(__dirname, 'public'),
		filename: '[name].dll.js',
		library: '[name]',
	},
	plugins: [
		new webpack.DllPlugin({
			path: './public/[name]-manifest.json',
			name: '[name]',
			context: '',
		}),

		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
		}),
		new ExtractTextPlugin('[name].css'),
	],
};
