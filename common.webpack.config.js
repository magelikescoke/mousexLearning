const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlguin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');
const { BASE_REQUEST_URL, BASE_ROUTE_URL, DEFAULT_TITLE, DEFAULT_LOGO, STYLE_CONFIG } = require('./application.config');

// ==================================
// DEFAULT CONFIG
//
const DEFAULT_TEMPLATE = path.resolve(process.cwd(), './index.html');
const VERSION = require(path.resolve(process.cwd(), './package.json')).version;
const publicFilePath = path.resolve(process.cwd(), './public');
const outputPath = path.resolve(process.cwd(), './dist');
const PREFIX_PATH = '/';
// ==================================
// Check
//
if (!/\/$/.test(BASE_ROUTE_URL)) {
    throw new Error(`BASE_ROUTE_URL 必须以 '/' 结尾，当前配置 '${BASE_ROUTE_URL}'，请检查!`);
}

// ==================================
// Exports
//
module.exports.getOutput = (mode) => {
    return {
        filename: 'bundle.[hash].js',
        chunkFilename: '[name].[hash].chunk.js',
        publicPath: BASE_ROUTE_URL,
    };
};

module.exports.getRules = (mode) => {
    return [
        {
            test: /\.[jt]sx?$/,
            exclude: /node_modules/,
            use:
                mode === 'development'
                    ? [
                          {
                              loader: 'babel-loader',
                              options: require('./babel.config'),
                          },
                          // {
                          //     loader: 'eslint-loader',
                          //     options: {
                          //         emitWarning: true,
                          //         fix: true,
                          //     },
                          // },
                      ]
                    : [
                          {
                              loader: 'babel-loader',
                              options: require('./babel.config'),
                          },
                      ],
        },

        {
            test: /\.css$/,
            oneOf: [
                {
                    resourceQuery: /modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: mode === 'development' ? true : false,
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                },
                            },
                        },
                        'postcss-loader',
                    ],
                },
                {
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: mode === 'development' ? true : false,
                            },
                        },
                        {
                            loader: 'css-loader',
                        },
                        'postcss-loader',
                    ],
                },
            ],
        },
        {
            test: /\.less$/,
            oneOf: [
                {
                    resourceQuery: /modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: mode === 'development' ? true : false,
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                },
                            },
                        },
                        'postcss-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                javascriptEnabled: true,
                                modifyVars: STYLE_CONFIG,
                            },
                        },
                    ],
                },
                {
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: mode === 'development' ? true : false,
                            },
                        },
                        {
                            loader: 'css-loader',
                        },
                        'postcss-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                javascriptEnabled: true,
                                modifyVars: STYLE_CONFIG,
                            },
                        },
                    ],
                },
            ],
        },
        {
            test: /\.(png|jpg|bmp|ico|mp3)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {},
                },
            ],
        },
    ];
};

module.exports.getPlugins = (mode) => {
    return [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            BASE_ROUTE_URL: JSON.stringify(BASE_ROUTE_URL),
            PREFIX_PATH: JSON.stringify(PREFIX_PATH),
            BASE_REQUEST_URL: mode === 'development' ? '' : JSON.stringify(BASE_REQUEST_URL),
        }),
        new CleanWebpackPlugin(),
        new webpack.BannerPlugin(VERSION),
        new HtmlWebpackPlguin({
            template: DEFAULT_TEMPLATE,
            title: DEFAULT_TITLE,
            favicon: DEFAULT_LOGO,
        }),
        new MiniCssExtractPlugin({
            filename: mode === 'development' ? '[name].css' : '[name].[hash].css',
            chunkFilename: mode === 'development' ? '[id].css' : '[id].[hash].css',
        }),
        new MomentLocalesPlugin({
            localesToKeep: ['zh-cn'],
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: publicFilePath, to: outputPath }],
        }),
        // new CaseSensitivePathsWebpackPlugin({
        //     debug:true
        // }),
    ];
};
