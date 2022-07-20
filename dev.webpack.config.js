const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const { mocker } = require('dw-mx-request-mocker');
const { getRules, getPlugins, getOutput } = require('./common.webpack.config');
const cwd = process.cwd();

module.exports = {
    mode: 'development',
    entry: ['react-hot-loader/patch', 'core-js/stable', 'regenerator-runtime/runtime', path.resolve(cwd, './src/index.tsx')],
    output: getOutput('development'),
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
            '@': path.resolve(cwd, './src'),
        },
    },
    cache: true,
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    devServer: {
        before: (app) => {
            mocker(app, glob.sync('mock/*.js', { absolute: true }));
        },
        publicPath: '/',
        open: true,
        host: '127.0.0.1',
        hot: true,
        port: 8888,
        inline: true,
        historyApiFallback: true,
        proxy: {
            '/sef2': {
                target: `http://10.1.94.32:8111/`,
                pathRewrite: { '^/sef2': '' },
                proxyTimeout: 30 * 1000,
                timeout: 30 * 1000,
            },
            '/sef1': {
                target: `http://10.1.94.32:9988/sef_web_war/mousex`,
                cookiePathRewrite: {
                    [`/sef_web`]: '/',
                },
                pathRewrite: { '^/sef1': '' },
                proxyTimeout: 30 * 1000,
                timeout: 30 * 1000,
            },
            '/leaf6': {
                target: `http://10.1.92.238:8088/`,
                pathRewrite: { '^/leaf6': '' },
                proxyTimeout: 30 * 1000,
                timeout: 30 * 1000,
            },
            '/mx': {
                target: `http://10.1.94.32:8181/`,
                proxyTimeout: 30 * 1000,
                timeout: 30 * 1000,
            },
        },
    },
    module: {
        rules: getRules('development'),
    },
    plugins: getPlugins('development'),
};
