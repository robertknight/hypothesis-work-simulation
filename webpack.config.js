var webpack = require('webpack');

module.exports = {
    entry: {
		'app': './build/app.js'
    },
    output: {
        path: './dist',
        filename: '[name]-bundle.js'
    },
	externals: {
		'react': 'React'
	}
};
