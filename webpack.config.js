const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        'main.bundle': './src/index.js',
        'module1.bundle': './src/module1/index.js',
        'module2.bundle': './src/module2/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'bundle.js'
        filename: '[name].js',
        chunkFilename: '[name].[id].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{loader: 'babel-loader'}],
                include: /src/,
                exclude: /node_modules/,
            },
        ]
    },
    optimization:{
        splitChunks: {
            chunks: "async",
            // chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['main.bundle'],
            filename: 'index.html',

            template: path.resolve(__dirname, './src/index.html')
        }),
    ]
};