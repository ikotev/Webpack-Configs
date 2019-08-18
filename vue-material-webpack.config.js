"use strict";

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webRoot = 'wwwroot';

var config = {
    stats: { colors: true },

    entry: {
        app: './src/app.js',
        app2: './src/app.js',
        app3: './src/app.js',
        app4: './src/app.js',
        app5: './src/app2.js',
        app6: './src/app2.js'
    },

    output: {
        filename: '[name].js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, webRoot)
    },

    optimization: {
        
        splitChunks: {
            chunks: 'all',
            minSize: 0,

            cacheGroups: {
                default: {
                    reuseExistingChunk: false
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors'
                }
            }
        }
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    module: {
        rules: [
            {
                test: /\.css/,
                //use: ['style-loader', 'css-loader']
                use: [
                    { loader: MiniCssExtractPlugin.loader, options: {} },
                    'css-loader']
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),

        new webpack.ProvidePlugin({
            _: 'lodash'
        }),

        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
            chunkFilename: "[id].css"
        }),

        new VueLoaderPlugin(),

        //new BundleAnalyzerPlugin()
    ]
};

module.exports = (env, argv) => {
    config.mode = env.mode;
    // "build:dev": "webpack --config webpack.config.js --env.mode=development"

    if (argv.mode === 'development') {
        config.devtool = 'inline-source-map';
    }

    if (argv.mode === 'production') {
        //
    }

    return config;
};
