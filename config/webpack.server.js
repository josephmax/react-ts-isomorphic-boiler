const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: "production",
    entry: path.join(__dirname, '../src/server/app.ts'),
    output: {
        filename: "app.js",
        path: path.join(__dirname, '../dist'),
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'babel-loader',
            }
        ]
    },
    node: {
        __dirname: false, // 编译过程中不提供__dirname值
    },
    resolve: {
        alias: {
            'isomorphic': path.join(__dirname, '../src/isomorphic'),
        },
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
}