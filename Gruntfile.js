"use strict";

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		watch: {
			compass: {
				files: ["**/*.{scss,sass}"],
				tasks: ["compass:dev"]
			},
			includes: {
				files: ["views/*.html", "include/*.html"],
				tasks: ["includes:compile"]
			}
		},
		compass: {
			dev: {
				options: {
					sassDir: ["sass/"],
					cssDir: ["css/"],
					environment: "development"
				}
			},
			prod: {
				options: {
					sassDir: ["sass/"],
					cssDir: ["css/"],
					environment: "production"
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 1414,
					base: "."
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: "js/",
					paths: {
						"jquery": "../bower_components/jquery/dist/jquery",
						"bootstrap": "../bower_components/bootstrap/dist/js/bootstrap.js"
					},
					shim: {
						"bootstrap": {
							deps: ["jquery"]
						}
					},
					mainConfigFile: "js/main.js",
					name: "main",
					out: "js/main.min.js",
					removeCombined: true
				}
			}
		},
		includes: {
			compile: {
				cwd: "views",
				src: ["*.html"],
				dest: ".",
				options: {
					flatten: true,
					includePath: "include"
				}
			}
		},
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			default: ["watch:compass", "watch:includes"]
		}
	});

	// DEPENDENT PLUGINS
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-compass");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks("grunt-includes");
	grunt.loadNpmTasks("grunt-concurrent");

	// TASKS
	grunt.registerTask("default", ["includes:compile", "compass:dev", "connect:server", "concurrent"]);
	grunt.registerTask("build", ["compass:prod", "requirejs:compile", "includes:compile"]);
};