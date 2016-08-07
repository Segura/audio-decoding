module.exports = function(grunt) {

    grunt.initConfig({
        ngtemplates: {
            main: {
                cwd: 'src/',
                src: [
                    '**/*.html',
                ],
                dest: 'dist/templates.js',
                options: {
                    module: 'audioDecodingApp',
                    htmlmin: {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true,
                        removeComments: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            }
        },
        concat: {
            main: {
                src: [
                    'src/bower_components/angular/angular.js',
                    'src/bower_components/angular-route/angular-route.js',
                    'src/bower_components/angular-resource/angular-resource.js',
                    'src/app.module.js',
                    'src/app.config.js',
                    'src/core/core.module.js',
                    'src/core/clip/clip.module.js',
                    'src/core/clip/clip.service.js',
                    'src/core/page/page.module.js',
                    'src/core/page/page.service.js',
                    'src/core/page/page.controller.js',
                    'src/clip-list/clip-list.module.js',
                    'src/clip-list/clip-list.component.js',
                    'src/clip-decode/clip-decode.module.js',
                    'src/clip-decode/clip-decode.directive.js',
                    'src/audio-player/audio-player.module.js',
                    'src/audio-player/audio-player.directive.js',
                    'src/audio-player/audio-player.filter.js',
                    '<%= ngtemplates.main.dest %>'
                ],
                dest: 'dist/audio-decode.js'
            }
        },
        uglify: {
            main: {
                files: {
                    'dist/audio-decode.min.js': '<%= concat.main.dest %>'
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.registerTask('default', ['ngtemplates', 'concat', 'uglify']);
};