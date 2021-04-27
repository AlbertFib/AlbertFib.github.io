'use strict';

let path = require('path');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './_src/js/main.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  watch: true,

  devtool: "source-map",

  module: {
    rules: [{
        test:/.(s*)css$/,
        use: [
            miniCss.loader,
            'css-loader?url=false',
            'sass-loader',
        ]
    }]
},
    plugins: [
        new miniCss({
            filename: '../css/style.css',
        }),
    ]
};

