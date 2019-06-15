"use strict";

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const webRoot = 'wwwroot';

var config = {
    stats: { colors: true },

    entry: {
        main: './src/main.js'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, webRoot)
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
                use: [{ loader: MiniCssExtractPlugin.loader, options: {} }, 'css-loader']
            },
            {
                test: /\.(scss)$/,
                use: [
                    //{ loader: 'style-loader' },
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
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
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.html/,
                use: ['html-loader']
            },
            {
                test: /\.(png|jpg)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './img'
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin([webRoot + '/*']),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),

        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            title: 'Custom template',
            template: './src/index.html'
        }),
        new VueLoaderPlugin()
    ]
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'inline-source-map';
    }

    if (argv.mode === 'production') {
        //...
    }

    return config;
};
