const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = function (/*env, options*/) {
	return {
		entry: './src/index.ts',
		output: {
			filename: 'index.js',
			path: path.resolve(__dirname, 'dist'),
		},
		resolve: {
			extensions: ['.ts', '.js']
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
					}]
				}
			]
		},
		optimization: {
			minimizer: [
			  new TerserPlugin({
				extractComments: false,
				terserOptions: {
					output: {
						comments: false,
					},
				},
			  }),
			],
		  },
	};
};
