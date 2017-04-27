'use strict';

module.exports = function (grunt) {
  require('time-grunt')(grunt); // Show elapsed time after tasks run
  require('jit-grunt')(grunt, { scsslint: 'grunt-scss-lint' }); // Load all Grunt tasks

  grunt.initConfig({
    // Configurable paths
    yeoman: {
      app: 'app',
      dist: 'dist',
      tmp: '.tmp'
    },
    checkDependencies: {
      npm: {
        options: {
          packageManager: 'npm',
          install: true,
          continueAfterInstall: true
        }
      },
      bower: {
        options: {
          packageManager: 'bower',
          install: true,
          continueAfterInstall: true
        }
      },
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      }
    },
    assemble: {
      options: {
        flatten: true,
        partials: ['<%= yeoman.app %>/_includes/**/*.hbs'],
        layoutdir: '<%= yeoman.app %>/_layouts',
        layout: 'default.hbs',
        helpers: ['./helpers/times.js']
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          src: [
            '<%= yeoman.app %>/*.hbs',
            '<%= yeoman.app %>/pages/**/*.hbs'
          ],
          dest: '<%= yeoman.tmp %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          src: [
            // Assemble processes and moves HTML and text files
            // Copy moves asset files and directories
            'scripts/**/*',
            'images/**/*',
            'fonts/**/*',
            '!**/_*{,/**}', // Exclude files & folders prefixed with an underscore
            // Explicitly add any files your site needs for distribution here
            // ex: './vendor/jquery/jquery.js',
            'favicon.ico',
            // 'apple-touch*.png'
          ],
          dest: '<%= yeoman.dist %>'
        }]
      },
      tmp: {
        files: [{
          cwd: '<%= yeoman.tmp %>/app',
          expand: true,
          flatten: false,
          src: [
            '**/*'
          ],
          dest: '<%= yeoman.dist %>'
        }]
      },
      vendorScripts: {
        files: [{
          cwd: './vendor/bower_components',
          expand: true,
          flatten: true,
          src: [
            'bootstrap/dist/js/bootstrap.min.js',
            'jquery/dist/jquery.min.js'
          ],
          dest: '<%= yeoman.dist %>/vendor/scripts/'
        }]
      },
      vendorStyles: {
        files: [{
          cwd: './vendor/bower_components',
          expand: true,
          flatten: true,
          src: ['bootstrap/dist/css/bootstrap.min.css'],
          dest: '<%= yeoman.dist %>/vendor/styles/'
        }]
      },
      vendorFonts: {
        files: [{
          cwd: './vendor/bower_components',
          expand: true,
          flatten: true,
          src: [''],
          dest: '<%= yeoman.dist %>/vendor/fonts/'
        }]
      }
    },
    sass: {
      options: {
        paths: [
          './vendor',
          './vendor/bower_components'
        ],
      },
      dist: {
        options: {
          compress: false,
          debugInfo: false,
          lineNumbers: false,
          // optimization: 2,
          yuicompress: false,
          sourceMap: false,
          sourceMapBasepath: 'app/',
          sourceMapRootpath: '../'
        },
        files: {
          '<%= yeoman.dist %>/styles/main.css': '<%= yeoman.app %>/styles/main.scss'
        }
      }
    },
    concat: {
      styles: {
        src: ['<%= yeoman.dist %>/styles/*.css'],
        dest: '<%= yeoman.dist %>/styles/main.css'
      },
      scripts: {
        src: ['<%= yeoman.dist %>/scripts/*.js'],
        dest: '<%= yeoman.dist %>/scripts/app.js'
      }
    },
    cssmin: {
      dist: {
        options: {
          check: 'gzip'
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/styles',
          src: ['*.css', '!*.min.css'],
          dest: '<%= yeoman.dist %>/styles',
          ext: '.css'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/app.js': ['<%= yeoman.dist %>/scripts/app.js']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: false
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    imagemin: {
      dist: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.{jpg,jpeg,png}',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.svg',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    browserSync: {
      server: {
        bsFiles: {
          src: [
            '<%= yeoman.dist %>/**/*'
          ]
        },
        options: {
          server: {
            baseDir: '<%= yeoman.dist %>/'
          },
          open: true,
          watchTask: true,
          notify: false,
          xip: false
        }
      }
    },
    watch: {
      styles: {
        files: ['<%= yeoman.app %>/styles/**/*.scss'],
        tasks: ['sass:dist', 'scsslint:app']
      },
      scripts: {
        files: ['<%= yeoman.app %>/scripts/**/*.js'],
        tasks: ['copy:dist', 'eslint:app']
      },
      pages: {
        files: ['<%= yeoman.app %>/**/*.hbs'],
        tasks: ['newer:assemble:dist', 'copy:tmp']
      },
      images: {
        files: ['/images/**/*'],
        tasks: ['copy:dist']
      }
    },
    eslint: {
      options: {
        configFile: '.eslintrc',
        format: 'node_modules/eslint-tap'
      },
      app: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/**/*.js',
        '!<%= yeoman.app %>/scripts/vendor/**/*'
      ],
      dist: [
        '<%= yeoman.dist %>/scripts/**/*.js'
      ]
    },
    // lesslint: {
    //   options: {
    //     csslint: {
    //       csslintrc: '.csslintrc'
    //     },
    //     failOnWarning: false
    //   },
    //   app: {
    //     src: ['<%= yeoman.app %>/styles/**/*.less'],
    //   }
    // },
    scsslint: {
      app: [
        '/styles/**/*.scss',
        '!/styles/main.scss',
        '!/styles/syntax.scss'
      ],
      options: {
        bundleExec: false,
        // config: '.scss-lint.yml',
        // reporterOutput: 'scss-lint-report.xml',
        colorizeOutput: true
      },
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      dist: {
        src: ['<%= yeoman.dist %>/styles/main.css']
      }
    },
    uncss: {
      dist: {
        files : {
          '<%= yeoman.dist %>/styles/main.css': [
            '<%= yeoman.dist %>/**/*.html'
          ]
        }
      }
    },
    ftpush: {
      build: {
        auth: {
          host: 'hcaprototype.com',
          port: 21,
          authKey: 'key1'
        },
        //distribute from the dist folder
        src: '<%= yeoman.dist %>',
        //distribute to this directory
        dest: '.hcaprototype.com/html/',
        //exclude the .git directory from distribution
        exclusions: ['<%= yeoman.dist %>/.git'],
        //keep: ['/important/images/at/server/*.jpg']
      }
    }
  });

  // Define Tasks
  grunt.registerTask('serve', [
    'checkDependencies',
    'clean:dist',
    'assemble:dist',
    'copy:tmp',
    'copy:vendorScripts',
    'copy:vendorStyles',
    // 'copy:vendorFonts',
    'copy:dist',
    'sass:dist',
    'eslint:app',
    'scsslint:app',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('check', [
    'checkDependencies',
    'clean:dist',
    'assemble:dist',
    'copy:tmp',
    'copy:vendorScripts',
    'copy:vendorStyles',
    // 'copy:vendorFonts',
    'copy:dist',
    'sass:dist',
    'eslint:app',
    'eslint:dist',
    'scsslint:app',
    'csslint:dist'
  ]);

  grunt.registerTask('build', [
    'checkDependencies',
    'clean:dist',
    'assemble:dist',
    'copy:tmp',
    'copy:vendorScripts',
    'copy:vendorStyles',
    // 'copy:vendorFonts',
    'copy:dist',
    'sass:dist',
    'eslint:dist',
    'csslint:dist',
    'uncss:dist',
    'concat:scripts',
    'concat:styles',
    'uglify:dist',
    'cssmin:dist',
    'imagemin:dist',
    'svgmin:dist',
    'htmlmin:dist'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'ftpush'
  ]);

  grunt.registerTask('default', [
    'serve'
  ]);
};
