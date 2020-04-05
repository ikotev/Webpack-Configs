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
        app1: './src/app1.js',
        app2: './src/app2.js'
    },

    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[chunkhash].bundle.js',
        path: path.resolve(__dirname, webRoot)
        //library: '[name]',
        //libraryTarget: 'var'
    },

    optimization: {
        minimize: false,
        runtimeChunk: 'single',
        moduleIds: 'hashed',
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            minChunks: 1,
            automaticNameDelimiter: '-',
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

    resolve: {
        extensions: [".ts", ".tsx", ".js"],

        alias: {
            '@': path.join(__dirname, 'src')
            //'vue$': 'vue/dist/vue.esm.js'
        }
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },

            {
                test: /\.css/,
                //use: ['style-loader', 'css-loader']
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),

        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false),
            VERSION: "'v.1.1'"
        }),

        //new HtmlWebpackPlugin({
        //    template: './src/index.html',
        //    //inject: false,
        //    //minify: false
        //}),

        //new webpack.ProvidePlugin({
        //    _: 'lodash'
        //}),

        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
            chunkFilename: "[id].css"
        }),

        new VueLoaderPlugin()

        //new BundleAnalyzerPlugin()
    ]
};

module.exports = (env, argv) => {
    config.mode = argv.mode;
    // "build:dev": "webpack --config webpack.config.js --mode=development"

    if (argv.mode === 'development') {
        config.devtool = 'inline-source-map';
        config.watch = false;
        config.watchOptions = {
            ignored: /node_modules/
        };
    }

    if (argv.mode === 'production') {
        //
    }

    return config;
};
