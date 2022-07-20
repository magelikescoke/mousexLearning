const path = require('path');

const {getRules, getPlugins, getOutput} = require("./common.webpack.config");

const cwd = process.cwd();

module.exports = {
    mode: 'production',
    entry: [ 'core-js/stable','regenerator-runtime/runtime', path.resolve(cwd, './src/index.tsx')],
    output: getOutput('production'),
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            "@": path.resolve(cwd, "./src")
        }
    },
    cache: true,
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: getRules('production')
    },
    plugins: getPlugins('production')
};
