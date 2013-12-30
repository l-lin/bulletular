// Generated on 2013-11-23 using generator-angular 0.6.0-rc.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var vendors2Copy = [];

    grunt.initConfig({
        yeoman: {
            // configurable paths
            src: 'src',
            dist: 'dist',
            build: '.tmp'
        },
        watch: {
            styles: {
                files: ['<%= yeoman.src %>/styles/{,*/}*.css'],
                tasks: ['copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= express.options.livereload %>'
                },
                files: [
                    '<%= yeoman.src %>/**/*.html',
                    '<%= yeoman.src %>/styles/{,*/}*.css',
                    '<%= yeoman.src %>/app/{,*/}*.js',
                    '<%= yeoman.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
            test: {
                options: {
                    livereload: {
                        port: 35728
                    }
                },
                files: [
                    '<%= yeoman.src %>/{,*/}*.html',
                    '{<%= yeoman.build %>,<%= yeoman.src %>}/app/{,*/}*.js'
                ],
                tasks: ['test']
            }
        },
        autoprefixer: {
            options: ['last 1 version'],
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.build %>/styles/',
                    src: '{,*/}*.css',
                    dest: '<%= yeoman.build %>/styles/'
                }]
            }
        },
        /** ------------- WATCH FILES FOR DEBUG PURPOSES ------------- */
        express: {
            options: {
                port: 9000,
                hostname: '127.0.0.1',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    bases: [
                        '<%= yeoman.src %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    bases: [
                        'test',
                        '<%= yeoman.src %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    bases: '<%= yeoman.dist %>'
                }
            }
        },
        /** ------------- CLEAN TMP FOLDERS ------------- */
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.build %>',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '<%= yeoman.build %>'
        },
        /** ------------- FORMAT JS CODES ------------- */
        jsbeautifier: {
            files: [
                '<%= yeoman.src %>/app/{,*/}*.js',
                'test/{,*/}*.js',
                'Gruntfile.js'
            ],
            options: {}
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.src %>/app/{,*/}*.js'
            ]
        },
        /** ------------- SOURCE CODES MINIMIZATION ------------- */
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/app/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/resources/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/resources/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.src %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.src %>/resources/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/resources/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.src %>/resources/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/resources/images'
                }]
            }
        },
        cssmin: {
            // By default, your `index.html` <!-- Usemin Block --> will take care of
            // minification. This option is pre-configured if you do not wish to use
            // Usemin blocks.
            // dist: {
            //   files: {
            //     '<%= yeoman.dist %>/styles/main.css': [
            //       '<%= yeoman.build %>/styles/{,*/}*.css',
            //       '<%= yeoman.src %>/styles/{,*/}*.css'
            //     ]
            //   }
            // }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
				  // https://github.com/yeoman/grunt-usemin/issues/44
				  //collapseWhitespace: true,
				  collapseBooleanAttributes: true,
				  removeAttributeQuotes: true,
				  removeRedundantAttributes: true,
				  useShortDoctype: true,
				  removeEmptyAttributes: true,
				  removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.src %>',
                    src: ['*.html', 'app/**/*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.build %>/concat/app',
                    src: '*.js',
                    dest: '<%= yeoman.build %>/concat/app'
                }]
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/app/app.js': [
                        '<%= yeoman.dist %>/app/app.js'
                    ]
                }
            }
        },
        /** ------------- COPY FILES NOT HANDLES IN OTHER TASKS ------------- */
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.src %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'resources/images/{,*/}*.{gif,webp}',
                        'resources/fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '<%= yeoman.build %>/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: [
                        'generated/*'
                    ]
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.src %>/styles',
                dest: '<%= yeoman.build %>/styles/',
                src: '{,*/}*.css'
            },
            bootstrap: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.src %>/vendor/bootstrap/dist',
                    dest: '<%= yeoman.dist %>',
                    src: 'fonts/*'
                }]
            },
            vendors: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.src %>',
                    dest: '<%= yeoman.dist %>',
                    src: vendors2Copy
                }]
            }
        },
        /** ------------- TASKS EXECUTION IN CONCURRENT MODE ------------- */
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        /** ------------- JS UNIT TESTING + CODE COVERAGE ------------- */
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        }
    });

    /** ---------------------------------------------------- */
    /** ------------- GRUNT TASKS REGISTRATION ------------- */
    /** ---------------------------------------------------- */

    grunt.registerTask('server', function(target) {
        if (target === 'dist') {
            return grunt.task.run([
                'clean:server',
                'concurrent:server',
                'autoprefixer',
                'express:dist',
                'watch:livereload'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'express:livereload',
            'watch:livereload'
        ]);
    });

    // Task to format js source code
    grunt.registerTask('format', [
        'jsbeautifier'
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'express:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        'copy:bootstrap',
        'copy:vendors',
        'cssmin',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'format',
        'jshint',
        'test',
        'build'
    ]);
};
