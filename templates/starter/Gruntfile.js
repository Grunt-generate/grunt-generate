module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        less: {
          development: {
            options: {
              paths: ["assets/css"]
            },
            files: {
              '<%= yeoman.app %>/styles/main.css' : "<%= yeoman.app %>/styles/main.less"
            }
          },
          production: {
            options: {
              paths: ["assets/css"],
              yuicompress: true
            },
            files: {
              '<%= yeoman.app %>/styles/prod.css' : "<%= yeoman.app %>/styles/main.less"
            }
          }
        },
        buildTemplates :{
            files : ['<%= yeoman.app %>/templates/*.html']
        },
        watch: {
            less: {
                files: ['<%= yeoman.app %>/styles/*.{less}'],
                tasks: ['less']
            },
            test: {
              files: '<%= jshint.test.src %>',
              tasks: ['jshint:test', 'qunit']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        concat : {
            options: {
              separator: ''
            },
            dist: {
              src: ['<%= yeoman.app %>/scripts/templates/*.html'],
              dest: '<%= yeoman.app %>/scripts/templates/main.html'
            }
        }
    });


    grunt.registerTask('build', [
     //   'jshint',
        'less',
        'imagemin',
        'concat',
    //    'uglify',
    ]);

    grunt.registerTask('default', ['build']);

    grunt.registerTask( "backbone:router", "Generate a router", function() {
        var conf = grunt.config('index'),
            tmpl = grunt.file.read(conf.src);

        grunt.file.write(conf.dest, grunt.template.process(tmpl));

        grunt.log.writeln('Generated \'' + conf.dest + '\' from \'' + conf.src + '\'');
    });

}