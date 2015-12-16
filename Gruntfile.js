"use strict";

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		watch: {
			compass: {
				files: ["**/*.{scss,sass}"],
				tasks: ["compass:default"]
			},
			includereplace: {
				files: ["src/views/*.html", "src/include/*.html"],
				tasks: ["includereplace:default"]
			},
			srcJs: {
				files: ["src/**/*.js"],
				tasks: ["copy:srcJs"]
			}
		},
		compass: {
			default: {
				options: {
					sassDir: ["src/sass/"],
					cssDir: ["dist/css/"],
					sourcemap: true,
					environment: "development"
				}
			},
			build: {
				options: {
					sassDir: ["src/sass/"],
					cssDir: ["dist/css/"],
					environment: "production",
					outputStyle: "compressed"
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 1414,
					base: "dist/"
				}
			}
		},
		requirejs: {
			build: {
				options: {
					baseUrl: "src/js/",
					paths: {
						"jquery": "../../bower_components/jquery/dist/jquery",
						"bootstrap": "../../bower_components/bootstrap-sass/assets/javascripts/bootstrap"
					},
					shim: {
						"bootstrap": {
							deps: ["jquery"]
						}
					},
					mainConfigFile: "src/js/main.js",
					name: "main",
					out: "dist/js/main.min.js",
					removeCombined: true
				}
			}
		},
		includereplace: {
			default: {
				options: {
					globals: {
						build: ""
					},
					includesDir: "src/include"
				},
				src: "*.html",
				dest: "dist/",
				expand: true,
				cwd: "src/"
			},
			build: {
				options: {
					globals: {
						build: ".min"
					},
					includesDir: "src/include"
				},
				src: "*.html",
				dest: "dist/",
				expand: true,
				cwd: "src/"
			}
		},
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			default: ["watch:compass", "watch:includereplace", "watch:srcJs"]
		},
		copy: {
			default: {
				files: [{
					expand: true,
					cwd: "bower_components/requirejs/",
					src: ["require.js"],
					dest: "dist/js"
				}, {
					expand: true,
					cwd: "bower_components/bootstrap-sass/assets/fonts/bootstrap",
					src: ["*"],
					dest: "dist/fonts"
				}]

			},
			srcJs: {
				expand: true,
				cwd: "src/js",
				src: ["**/*.js"],
				dest: "dist/js"
			},
			bowerComponents: {
				expand: true,
				cwd: "bower_components",
				src: ["**/*"],
				dest: "dist/bower_components"
			}
		},
		clean: {
			default: {
				src: ["dist/**/*"]
			}
		}
	});

	// DEPENDENT PLUGINS
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-compass");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks("grunt-include-replace");
	grunt.loadNpmTasks("grunt-concurrent");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-clean");

	// TASKS
	grunt.registerTask("default", ["clean", "includereplace:default", "compass:default", "copy:bowerComponents", "copy:default", "copy:srcJs", "connect:server", "concurrent"]);
	grunt.registerTask("build", ["clean", "compass:build", "requirejs:build", "includereplace:build", "copy:default"]);
};