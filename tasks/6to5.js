var to5;

to5 = require("6to5");

module.exports = function(grunt) {
  grunt.registerMultiTask("6to5", "Transpile ES6 to ES5", function() {
    var options;
    options = this.options();
    return this.files.forEach(function(el) {
      var res;
      options.filename = el.src[0];
      options.filenameRelative = el.src[0].replace("js/", "");
      res = to5.transformFileSync(el.src[0], options);
      grunt.file.write(el.dest, res.code);
      if (res.map) {
        return grunt.file.write(el.dest + ".map", JSON.stringify(res.map));
      }
    });
  });
  return {
    options: {
      blacklist: ["useStrict"]
    },
    browser: {
      options: {
        modules: "amd",
        amdModuleIds: true,
        runtime: "polyfill",
        sourceMap: true
      },
      files: [
        {
          expand: true,
          cwd: "js",
          src: "**/**/*.js",
          dest: "tmp"
        }
      ]
    },
    node: {
      options: {
        modules: "common"
      },
      files: [
        {
          expand: true,
          cwd: "js",
          src: "**/**/*.js",
          dest: "dist/"
        }
      ]
    }
  };
};