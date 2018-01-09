module.exports = {
    entry: './app.ts',
    output: {
        path: './dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ["ts"],
                exclude: /^node_modules$/
            },
            {
                test: /\.css$/,
                loaders: ["style", "css"], //[last, ..., first]
                exclude: /^node_modules$/
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    }
    //,devtool: "inline-source-map"
}
