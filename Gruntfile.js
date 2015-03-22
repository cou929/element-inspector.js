module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        jshint: {
            options: {
                indent: 4,
                undef: true,
                trailing: true,
                laxbreak: true,
                funcscope: false,
                node: true,
                jquery: true,
                browser: true,
                es3: true,
                eqeqeq: true,
                forin: true,
                freeze: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                unused: true,
                strict: true
            },
            files: [
                'Gruntfile.js',
                'src/**/*.js'
            ]
        },
        espower: {
            test: {
                files: [
                    {
                        expand: true,
                        cwd: 'test/',
                        src: ['**/*.spec.js'],
                        dest: 'espowered/',
                        ext: '.js'
                    }
                ]
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-karma");
    grunt.loadNpmTasks("grunt-espower");

    grunt.registerTask('test', ['jshint', 'espower', 'karma']);
};
