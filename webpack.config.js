const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: process.env.NODE_ENV,
    entry: path.join(__dirname, './client/index.js'),
    output:{
        filename: "bundle.js",
        path: __dirname + '/build',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                //include: [/client\/index.js/, /(client\/components)/,/(server)/],
                loader: "babel-loader",
                options: {presets: ["@babel/preset-env", "@babel/preset-react"]}
            },
            {
                test: /\.html$/,
                include: [/index.html/],
                loader: "html-loader"
            },
            {
                test: /\.css$/,
                //include: /(client\/scss)/,
                use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ]
            }
        ]
    }
}