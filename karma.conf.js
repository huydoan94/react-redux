module.exports = function (config) {
    config.set({
        preprocessors: {
            'client/**/*.spec.js': ['webpack', 'sourcemap']
        },
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        plugins: ['transform-decorators-legacy'],
                        presets: ['es2015', 'es2017', 'react', 'stage-0']
                    }
                },
                { test: /\.scss$/, loader: 'ignore' },
                { test: /\.css$/, loader: 'ignore' },
                { test: /\.png$/, loader: 'ignore' },
                { test: /\.json$/, loader: 'json' }
                ]
            },
            externals: {
                'cheerio': 'window',
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
            }
        },
        webpackServer: {
            noInfo: true
        },
        browsers: ['PhantomJS'],
        frameworks: ['mocha'],
        reporters: ['dots'],
        files: [
            './node_modules/phantomjs-polyfill-find/find-polyfill.js',
            './node_modules/phantomjs-polyfill-includes/includes-polyfill.js',
            './node_modules/phantomjs-polyfill-string-includes/index.js',
            './node_modules/babel-polyfill/dist/polyfill.js',
            'client/**/*.spec.js'
        ]
    });
};
