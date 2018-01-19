
const webpack = require('webpack');  //eslint-disable-line
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //eslint-disable-line

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader'],
				}),
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'less-loader'],
				}),
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'fonts/', // where the fonts will go
						publicPath: '../', // override the default path
					},
				}],
			},
		],
	},
	plugins: [
		new ExtractTextPlugin('style.css'),
		// new UglifyJSPlugin(),
		new webpack.DllReferencePlugin({
			context: '',
			manifest: './public/vendor-manifest.json',
		}),
	],
};
