module.exports = function(grunt) {
    require("time-grunt")(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        opt: {
            main: "src/main",
            test: "src/test",
            appMain: "app/main",
            appTest: "app/test",

            tsMain: "<%= opt.main %>/scripts",
            tsTest: "<%= opt.test %>/scripts"
        },
        run: {
            cmdline: {
                cmd: "node",
                args: ["<%= opt.appMain %>/index.js"]
            }
        },
        clean: {
            main: {
                src: [
                    "<%= opt.tsMain %>/**/*.js",
                    "<%= opt.tsMain %>/**/*.js.map",
                    "<%= opt.appMain %>/**/*.js",
                    "<%= opt.appMain %>/**/*.js.map"
                ]
            },
            test: {
                src: [
                    "<%= opt.tsTest %>/**/*.js",
                    "<%= opt.tsTest %>/**/*.js.map",
                    "<%= opt.appTest %>/**/*.js",
                    "<%= opt.appTest %>/**/*.js.map"
                ]
            }
        },
        ts: {
            options: {
                compile: true,      // true (default), false - compile TypeScript code.
                target: "es5",      // 'es5' (default), 'es3', or 'es6' - targeted ECMAScript version
                module: "commonjs"  // default to be nothing, If you want to set it you set it to either 'amd' or 'commonjs'
            },
            main: {
                src: ["<%= opt.tsMain %>/index.ts"],
                outDir: "<%= opt.appMain %>"
            }
        },
        tslint: {
            options: {
                configuration: grunt.file.readJSON("tslint.json")
            },
            files: {
                src: [
                    "<%= opt.tsMain %>/**/*.ts",
                    "<%= opt.tsTest %>/**/*.ts",
                    "!<%= opt.tsMain %>/**/*.d.ts"
                ]
            }
        },
        tsd: {
            options: {
                command: "reinstall",     // execute a command
                latest: false,            // optional: always get from HEAD
                config: "./tsd.json"      // optional: specify config file
            }
        },
        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    verbose: true,
                    cleanBowerDir: false
                }
            }
        }
    });

    grunt.registerTask("setup", ["clean", "tsd", "bower"]);
    grunt.registerTask("compile", ["ts", "tslint"]);
    grunt.registerTask("default", ["clean", "compile", "run"]);

    require("load-grunt-tasks")(grunt);
};