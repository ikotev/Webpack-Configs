'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webRoot = 'wwwroot';

var config = {    
    stats: { colors: true },

    entry: {
        main: './src/index.jsx'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, webRoot),
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',                
                options: {
                    presets: ['@babel/preset-react'],
                    cacheDirectory: true,
                    plugins: ['react-hot-loader/babel']
                }
            },
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader', 
                        options: {
                            plugins: function () { 
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    'sass-loader']
            },
            {
                test: /\.css/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin([webRoot + '/*']),

        new HtmlWebpackPlugin({
            title: 'Custom template',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
            chunkFilename: "[id].css"
        })
    ]
};

module.exports = (env, argv) => {
    console.log('[ENVIRONMENT] ' + env.mode);

    config.mode = env.mode;

    if (env.mode === 'development') {
        config.devtool = 'inline-source-map';
    }
    else if (env.mode === 'production') {
        //...
    }

    return config;
};