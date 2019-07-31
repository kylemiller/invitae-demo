const path = require('path');

module.exports = {
    entry: './public/javascripts/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public/dist')
    },
    mode:'none',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use: ['css-loader'],
            }
        ]
    }
};
