const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = (ext) => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`);

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: isDev ? 'development' : 'production',
    entry: ['@babel/polyfill', './index.ts'],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },

    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 3000,
        hot: isDev,

    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            title: 'App excel',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
            },
        }),

        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },

            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },

        ],
    },
};