/*eslint-env node*/
/*eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports*/

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function () {
	return {
		entry: {
			index: './src/index.ts',
		},
		output: {
			path: path.resolve('dist'),
			filename: 'index.js',
			library: 'ganttchart',
			libraryTarget: 'umd',
		},
		resolve: {
			extensions: ['.ts', '.js'],
		},
		module: {
			rules: [
				{
					test: /.ts$/i,
					exclude: [/node_modules/],
					use: [{
						loader: 'ts-loader',
						options: {
							transpileOnly: true
						}
					},
					{
						loader: 'ifdef-loader',
						options: {
							'ifdef-verbose': false,
							'DEBUG': false
						}
					}]
				},
			]
		},
		plugins: [
			new CopyWebpackPlugin([
				{from: './src/index.css'},
				{from: './types/index.d.ts'},
			]),
		],
		devtool: 'source-map',
		performance: {
			hints: false,
		},
	};
};
