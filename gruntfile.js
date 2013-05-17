module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    // concurrent: {
    //   target_watch: ['watch'],
    //   target_jekyll: ['shell:jekyll']
    // },

    watch: {
      // compass: {
      //   files: ['sass/{,*/}*.{scss,sass}'],
      //   tasks: ['compass:server']
      // },
      // files: ['*.html', 'sass/**', '_includes/**', '_layouts/**', '_posts/**', '*.yml'],
      // tasks: ['compass:dist', 'shell:jekyll', 'copy', 'connect']
      files: ['sass/**'],
      tasks: ['compass:dist', 'copy', 'connect'],

      jekyllSources: {
        files: [
          // capture all except css - add your own
          '*.html', '*.yml',
          '_posts/**', '_includes/**'
        ],          
        tasks: 'shell:jekyll'
      }
    },

    copy: {
      css : {
        files: {
          // Copy the sass-generated style file to
          // the _site/ folder
          '_site/css/main.css': 'css/main.css'
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 9000,
          base: '_site',
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
          environment: 'production'
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
      jekyll: {
        command: 'rm -rf _site/*; jekyll build --watch; grunt server',
        stdout: true
      }
    }

  });

  // tasks
  grunt.registerTask('default', ['shell:jekyll', 'watch']);
  // grunt.registerTask('default', ['concurrent:target_watch', 'concurrent:target_jekyll']);
  grunt.registerTask('styles', ['compass:dist', 'copy']);
  grunt.registerTask('server', ['connect']);

};