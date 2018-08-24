module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            prodcss: {  /* For production */
                src: ['vendors/bootstrap/3.3.6/css/bootstrap.min.css', 
                	'vendors/animate/animate.min.css', 
                	'resources/quoting/common/css/main.prod.css'],
                	
                dest: 'resources/build/build.prod.css'
            },
            vendorsjs: {  /* For vendor js. Include all 3rd party js here. */
              src: [
                    'vendors/jquery/3.0.0/jquery-2.1.4.min.js',
                    'vendors/angularjs/1.4.7/angular.min.js',
                    'vendors/angularjs/1.4.7/angular-animate.min.js',
                    'vendors/angularjs/1.4.7/angular-resource.min.js',
                    'vendors/angularjs/1.4.7/angular-route.min.js',
                    'vendors/angularjs/1.4.7/angular-sanitize.min.js',
                    'vendors/angularjs/1.4.7/angular-touch.min.js',
                    'vendors/angularjs/1.4.7/angular-cookies.min.js',
                    'vendors/angular-ui-router/angular-ui-router.min.js',
                    'vendors/ngStorage.js',
                    'vendors/moment/moment.min.js',
                    'vendors/angular-moment/angular-moment.min.js',
                    'vendors/angular-ui-bootstrap/1.3.3/ui-bootstrap-tpls.min.js',
              	  	'vendors/underscore/underscore.js', 
                    'vendors/ng-idle/angular-idle.min.js',
               ],
                dest: 'resources/build/build.vendorsjs.js'
            },
            splitpdfsjs: {
                src: [
                    'resources/quoting/common/main/utilities.module.js',
                    'resources/quoting/modules/commonUtilities/common.utilities.module.js'
                    ],
                 dest: 'resources/build/build.splitpdfs.js'        
            }
        },
        concurrent: { 
            "default": {  /* reserved for the UE-team */
                tasks: ['watch:prodcss', 'watch:prodtar','watch:uglifyAllJSFiles','watch:vendorsjswatch','watch:splitpdfsjswatch']
            },
            prod: {  /* Used by the production environment. Prasanna: for local also developer can use prod task. This will take care of most of the js building. */
                tasks: ['watch:prodcss','watch:prodtar', 'watch:uglifyAllJSFiles', 'watch:vendorsjswatch','watch:splitpdfsjswatch'],
				options: {logConcurrentOutput: true, limit: 30}	
            }
        },
        cssmin: { /* Minification  of CSS files*/
            prodtar: {
                src: 'resources/build/build.prod.css',
                dest: 'resources/build/build.prod.min.css'
            }
        },
        uglify: { /* Minification  of JS files. Make sure to do it only for build files. Otherwise it will run in loop.*/
         	vendorfiles: {
                src: 'resources/build/build.vendorsjs.js',
                dest: 'resources/build/',
                expand: true,
                flatten: true,
                ext: '.vendorsjs.min.js'
            },
            splitpdfsfiles: {
                src: 'resources/build/build.splitpdfs.js',
                dest: 'resources/build',
                expand: true,
                flatten: true,
                ext: '.splitpdfs.min.js'
            },
            options: { mangle: false, /* Do not change variable names */
            	 	   compress: {
            	        drop_console: true, /* Drop all the console statements at the time of compression */
            	        drop_debugger : true	  /* Drop all the debugger statements at the time of compression */
            	       }
            		 }
        },
        watch: {
        	scss: {files: ['resources/quoting/common/scss/**/*.scss'], tasks: ['sass']},
            prodcss: {files: ['vendors/bootstrap/3.3.6/css/bootstrap.min.css', 'vendors/animate/animate.min.css', 'vendors/angular-multi-select/isteven-multi-select.css', 'resources/quoting/common/css/main.prod.css'], tasks: ['concat:prodcss']},
            prodtar: {files: ['resources/build/build.prod.css'], tasks: ['cssmin:prodtar']},
            vendorsjswatch: { /* Watch for vendor js files changes */
              files: [
                    'vendors/jquery/3.0.0/jquery-3.0.0.min.js',
                    'vendors/angularjs/1.4.7/angular.min.js',
                    'vendors/angularjs/1.4.7/angular-animate.min.js',
                    'vendors/angularjs/1.4.7/angular-resource.min.js',
                    'vendors/angularjs/1.4.7/angular-route.min.js',
                    'vendors/angularjs/1.4.7/angular-sanitize.min.js',
                    'vendors/angularjs/1.4.7/angular-touch.min.js',
                    'vendors/angularjs/1.4.7/angular-cookies.min.js',
                    'vendors/angular-ui-router/angular-ui-router.min.js',
                    'vendors/ngStorage.js',
                    'vendors/angular-ui-bootstrap/1.3.3/ui-bootstrap-tpls.min.js',
                    'vendors/underscore/underscore.js', 
                    'vendors/ng-idle/angular-idle.min.js'
                    ],
                 tasks: ['concat:vendorsjs']
            },
            splitpdfsjswatch: {
                files: [
                    //distideal
                    'resources/smp/main/splitpdfs.module.js'
                    
                ],
                tasks: ['concat:splitpdfsjs']        
            },        
            uglifyAllJSFiles: {  /* Watch for all build files changes */
              files: [
            	  'resources/build/build.vendorsjs.js',
                  'resources/build/build.splitpdfs.js'
                ], 
            	tasks: ['uglify']
            } // End of uglifyAllJSFiles
            
        } // End of watch
    }); // End of module.
    
    grunt.event.on('watch', function(action, filepath, target) {
  			grunt.log.writeln('Watch name: ' +target + ' filename: ' + filepath + ' has ' + action);
	});
  
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat:prodcss', 'cssmin:prodtar', 'concat:vendorsjs', 'concat:splitpdfsjs','uglify', 'concurrent:default']);
    grunt.registerTask('prod', ['concat:prodcss', 'cssmin:prodtar', 'concat:vendorsjs', 'concat:splitpdfsjs','uglify', 'concurrent:prod']);
};