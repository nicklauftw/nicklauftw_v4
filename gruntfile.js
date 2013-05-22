module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    concurrent: {
      dev: {
        tasks: ['connect:server_dev', 'shell:jekyll_dev', 'watch'],
      },
      dist: {
        tasks: ['shell:jekyll_dist', 'compass:dist', 'copy:css_dist']  
      },
      dist_server: {
        tasks: ['connect:server_dist', 'shell:jekyll_dist', 'compass:dist', 'copy:css_dist']  
      }
    },

    watch: {
      files: ['sass/**'],
      tasks: ['compass:dev', 'copy:css_dev'],
    },

    copy: {
      css_dev : {
        files: {
          // Copy the sass-generated style file to the _site/ folder
          '_site/css/main.css': 'css/main.css'
        }
      },
      css_dist : {
        files: {
          '_dist/css/main.css': 'css/main.css'
        }
      }
    },

    connect: {
      server_dev: {
        options: {
          port: 9000,
          base: '_site',
          keepalive: 'true'
        }
      },
      server_dist: {
        options: {
          port: 9000,
          base: '_dist',
          keepalive: 'true'
        }
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'css',
          javascriptsDir: 'js',
          environment: 'production',
          outputStyle: 'compressed'
        }   
      },
      dev: {
        options: {
          sassDir: 'sass',
          cssDir: 'css',
          javascriptsDir: 'js'
        }
      },      
      server: {
        options: {
            debugInfo: true
        },
        tasks: 'copy'
      }
    },

    shell: {
      jekyll_dev: {
        command: 'rm -rf _site/*; jekyll build --watch',
        stdout: true
      },
      jekyll_dist: {
        command: 'rm -rf _dist/*; jekyll build --destination _dist',
        stdout: true
      }
    }

  });

  // tasks
  grunt.registerTask('default', ['concurrent:dev']);
  grunt.registerTask('dist', ['concurrent:dist']);
  grunt.registerTask('dist server', ['concurrent:dist_server']);
  grunt.registerTask('styles', ['compass:dist', 'copy']);
  grunt.registerTask('server', ['connect']);

};