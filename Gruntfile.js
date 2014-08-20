'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    connect: {
      options: {
        port: 9999,
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: 'dist'
        }
      }
    },
    watch: {
      update: {
        files: ['src/**/*.css', 'src/**/*.md', 'src/**/*.js', 'src/**/*.html'],
        tasks: ['newer:copy', 'newer:markdown']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: ['dist/**/*.html', 'dist/**/*.css', 'dist/**/*.js'],
      }
    },
    clean: {
      dist:  ['dist/**/*.css', 'dist/**/*.html', 'dist/**/*.js']
    },
    copy: {
      bootstrap: {
        expand: true,
        cwd: 'bower_components/bootstrap/dist/css',
        src: ['*.min.css'],
        dest: 'dist/css'
      },
      impress: {
        expand: true,
        cwd: 'bower_components/impress.js/js',
        src: ['*.js'],
        dest: 'dist/screen/js'
      },
      document: {
        expand: true,
        cwd: 'src/',
        src: ['**/document.css'],
        dest: 'dist/'
      },
      screen: {
        expand: true,
        cwd: 'src/',
        src: ['**/screen.css', '**/impress.js'],
        dest: 'dist/screen'
      }
    },
    markdown: {
      document: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: '**/*.md',
            dest: 'dist/',
            ext: '.html'
          }
        ],
        options: {
          template: 'src/template/document.html',
          markdownOptions: {
            gfm: true,
            highlight: 'manual'
          },
          postCompile : function(html, templateContext) {
            var $ = require('cheerio').load(html);
            templateContext.rooturl = '.';
            templateContext.title = $('h1').first().text() || $('h2').first().text() || $('h3').first().text();
            
            $('h2').each(function(i, elem) {
              $(this).replaceWith('<a href="#navbar">' + $(this) + '</a>');
            });
            return $.html();
          }
        }
      },
      screen: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: '**/*.md',
            dest: 'dist/screen',
            ext: '.html'
          }
        ],
        options: {
          template: 'src/template/screen.html',
          markdownOptions: {
            gfm: true,
            highlight: 'manual'
          },
          postCompile : function(html, templateContext) {
            var $ = require('cheerio').load(html);
            templateContext.rooturl = '.';

            var h1 = $('h1');
            templateContext.title = h1.text();
            h1.replaceWith('<div id="title" class="step slide" data-x="0" data-y="0">' + h1 + '</div>');

            var x, y = 0;
            $('h2, h3, h4').each(function(i, elem) {
              if(elem.name === 'h2') {
                y++;
                x = 0;
              } else if(elem.name === 'h3') {
                x++;
              } else {
                y++;
              }
              var next = $(this).nextUntil('h2, h3, h4');
              var id, html;
              if(elem.name === 'h2') {
                id = $(this).attr('id');
                html = '<a href="#/step-2">' + $(this) + '</a>' + next;
              } else {
                id = '-';
                html = $(this) + next;
              }
              next.remove();
              $(this).replaceWith(
                  '<div ' + 
                    ((id === '-')? '' : 'id=' + id) + 
                    ' class="step slide" data-x="' + (x*1000) + 
                    '" data-y="' + (y*1000) + '">' + html + '</div>');
            });
            return $.html();
          }
        }
      }
    }
  });

  grunt.registerTask('build', [
    'clean', 
    'copy', 
    'markdown'
  ]);

  grunt.registerTask('default', [
    'build',
    'connect:livereload',
    'watch'
  ]);
};
