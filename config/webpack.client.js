const path = require('path');

module.exports = {
    mode: "production",
    entry: path.join(__dirname, '../src/client'),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, '../dist/static'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'babel-loader',
            }
        ]
    },
    resolve: {
        alias: {
            'isomorphic': path.join(__dirname, '../src/isomorphic'),
        },
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
}