module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    includereplace: {
      dist: {
        options: {
          globals: {
            version: '<%= pkg.version %>'
          }
        },
        files: [
          { src: '*.html', dest: 'dist/' }
        ]
      }
    },

    cssmin: {
      compress: {
        options: {
          keepSpecialComments: 0,
          report: 'min',
          selectorsMergeMode: 'ie8'
        },
        files: {
          'dist/css/pack-<%= pkg.version %>.css': [
            'css/normalize.css',
            'css/animate.css',
            'node_modules/codemirror/lib/codemirror/lib/codemirror.css',
            'css/styles.css'
          ]
        }
      }
    },

    uglify: {
      options: {
        /*compress: true,*/
        mangle: true,
        preserveComments: false,
        report: 'min'
      },
      compress: {
        files: {
          'dist/js/pack-<%= pkg.version %>.js': [
            'js/fixmyjs.js',
            'js/jshint.js',
            'js/jeesh.min.js',
            'node_modules/codemirror/lib/codemirror/lib/codemirror.js',
            'node_modules/codemirror/mode/javascript/javascript.js',
            'src/app.js'
          ]
        }
      }
    },

    connect: {
      server: {
        options: {
          base: 'dist/',
          keepalive: true,
          port: 4000
        }
      }
    },

    clean: {
      dist: 'dist/*'
    }

  });

  // Load the grunt plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-include-replace');

  grunt.registerTask('default', ['clean', 'includereplace', 'cssmin', 'uglify']);
  grunt.registerTask('server', ['default', 'connect']);
};
