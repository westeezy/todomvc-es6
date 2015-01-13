var amdclean, fs, to5;

fs = require('fs');

amdclean = require('amdclean');

module.exports = (function(_this) {
  return function(grunt, options) {
    var endFrag, mainFile, requirejsOptions, startFrag, to5Runtime;
    mainFile = 'index';
    startFrag = fs.readFileSync('js/frag/start.frag', 'utf8').replace(/@SCRIPT/g, options.scriptName);
    to5Runtime = fs.readFileSync('node_modules/6to5/browser-polyfill.js', 'utf8');
    endFrag = fs.readFileSync('js/frag/end.frag', 'utf8').replace(/@SCRIPT/g, options.scriptName);
    requirejsOptions = {
      baseUrl: 'tmp',
      name: mainFile,
      useStrict: true,
      wrap: false,
      preserveLicenseComments: true,
      findNestedDependencies: true,
      onModuleBundleComplete: function(data) {
        var outputFile;
        outputFile = data.path;
        return fs.writeFileSync(outputFile, amdclean.clean({
          code: fs.readFileSync(outputFile),
          wrap: {
            start: startFrag + to5Runtime,
            end: endFrag
          }
        }));
      }
    };
    return {
      expanded: {
        options: grunt.util._.extend({
          out: "dist/" + options.scriptName + ".js",
          optimize: 'none'
        }, requirejsOptions)
      },
      min: {
        options: grunt.util._.extend({
          out: "dist/" + options.scriptName + ".min.js",
          optimize: 'uglify2'
        }, requirejsOptions)
      }
    };
  };
})(this);