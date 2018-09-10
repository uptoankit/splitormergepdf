module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            prodcss: {  /* For production */
                src: ['vendors/bootstrap/3.3.6/css/bootstrap.min.css', 
                	'vendors/animate/animate.min.css', 
                	'ui-resources/quoting/common/css/main.prod.css'],
                	
                dest: 'ui-resources/build/build.prod.css'
            },
            vendorsjs: {  /* For vendor js. Include all 3rd party js here. */
              src: [
                    'vendors/jquery/jquery-2.2.4.min.js', 
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
              	  	'vendors/ng-idle/angular-idle.min.js'
               ],
                dest: 'ui-resources/build/build.vendorsjs.js'
            },
            splitmergepdfsjs: {
                src: [
                        'ui-resources/smp/main/splitmergepdfs.module.js',

                        'ui-resources/smp/modules/common/directive/fileModel.js',
                        'ui-resources/smp/modules/common/service/fileUpload.js',

                        'ui-resources/smp/modules/split/split.module.js',
                        'ui-resources/smp/modules/split/splitCtrl.js',
                        'ui-resources/smp/modules/common/header/headerCtrl.js',
                        'ui-resources/smp/modules/common/footer/footerCtrl.js',
                        'ui-resources/smp/modules/common/base/baseCtrl.js',

                        'ui-resources/smp/modules/merge/merge.module.js',
                        'ui-resources/smp/modules/merge/mergeCtrl.js'
                        
                    ],
                 dest: 'ui-resources/build/build.splitpdfs.js'        
            }
        },
        concurrent: { 
            "default": {  /* reserved for the UE-team */
                tasks: ['watch:prodcss', 'watch:prodtar','watch:uglifyAllJSFiles','watch:vendorsjswatch','watch:splitmergepdfsjswatch']
            },
            prod: {  /* Used by the production environment. Prasanna: for local also developer can use prod task. This will take care of most of the js building. */
                tasks: ['watch:prodcss','watch:prodtar', 'watch:uglifyAllJSFiles', 'watch:vendorsjswatch','watch:splitmergepdfsjswatch'],
				options: {logConcurrentOutput: true, limit: 30}	
            }
        },
        cssmin: { /* Minification  of CSS files*/
            prodtar: {
                src: 'ui-resources/build/build.prod.css',
                dest: 'ui-resources/build/build.prod.min.css'
            }
        },
        uglify: { /* Minification  of JS files. Make sure to do it only for build files. Otherwise it will run in loop.*/
         	vendorfiles: {
                src: 'ui-resources/build/build.vendorsjs.js',
                dest: 'ui-resources/build/',
                expand: true,
                flatten: true,
                ext: '.vendorsjs.min.js'
            },
            splitpdfsfiles: {
                src: 'ui-resources/build/build.splitpdfs.js',
                dest: 'ui-resources/build',
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
        	scss: {files: ['ui-resources/quoting/common/scss/**/*.scss'], tasks: ['sass']},
            prodcss: {files: ['vendors/bootstrap/3.3.6/css/bootstrap.min.css', 'vendors/animate/animate.min.css', 'vendors/angular-multi-select/isteven-multi-select.css', 'ui-resources/quoting/common/css/main.prod.css'], tasks: ['concat:prodcss']},
            prodtar: {files: ['ui-resources/build/build.prod.css'], tasks: ['cssmin:prodtar']},
            vendorsjswatch: { /* Watch for vendor js files changes */
              files: [
                    'vendors/jquery/jquery-2.2.4.min.js',
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
                    'vendors/ng-idle/angular-idle.min.js'
                    ],
                 tasks: ['concat:vendorsjs']
            },
            splitmergepdfsjswatch: {
                files: [
                    //distideal
                    'ui-resources/smp/main/splitmergepdfs.module.js',
                    
                    'ui-resources/smp/modules/common/directive/fileModel.js',
                    'ui-resources/smp/modules/common/service/fileUpload.js',

                    'ui-resources/smp/modules/split/split.module.js',
                    'ui-resources/smp/modules/split/splitCtrl.js',
                    'ui-resources/smp/modules/common/header/headerCtrl.js',
                    'ui-resources/smp/modules/common/footer/footerCtrl.js',
                    'ui-resources/smp/modules/common/base/baseCtrl.js',

                    'ui-resources/smp/modules/merge/merge.module.js',
                    'ui-resources/smp/modules/merge/mergeCtrl.js'
                ],
                tasks: ['concat:splitmergepdfsjs']        
            },        
            uglifyAllJSFiles: {  /* Watch for all build files changes */
              files: [
            	  'ui-resources/build/build.vendorsjs.js',
                  'ui-resources/build/build.splitpdfs.js'
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

    grunt.registerTask('default', ['concat:prodcss', 'cssmin:prodtar', 'concat:vendorsjs', 'concat:splitmergepdfsjs','uglify', 'concurrent:default']);
    grunt.registerTask('prod', ['concat:prodcss', 'cssmin:prodtar', 'concat:vendorsjs', 'concat:splitmergepdfsjs','uglify', 'concurrent:prod']);
};