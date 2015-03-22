module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha-debug', 'mocha'],
        files: [
            'node_modules/power-assert/build/power-assert.js',
            'src/**/*.js',
            'test/fixture/**/*.fixture.html',
            'espowered/**/*.js',
        ],
        exclude: [],
        preprocessors: {
            'test/fixture/**/*.html': ['html2js'],
        },
        reporters: ['mocha'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false
    });
};
