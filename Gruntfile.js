module.exports = function(grunt) {
  var tasks;
  require('load-grunt-tasks')(grunt);
  tasks = require('load-grunt-configs')(grunt, {
    config: {
      src: ['tasks/*.js']
    },
    scriptName: 'MyScript',
    pkg: grunt.file.readJSON('package.json'),
    now: new Date().getTime()
  });
  grunt.initConfig(tasks);
  grunt.registerTask('build', ['clean:build', 'jshint', 'browserify', 'uglify', 'clean:tmp']);
  grunt.registerTask('build-require', ['clean:build', 'jshint', '6to5', 'requirejs', 'clean:tmp']);
  grunt.registerTask('test', ['build', 'mocha']);
  grunt.registerTask('saucelabs', ['connect:server', 'saucelabs-mocha']);
  grunt.registerTask('serve', 'connect:stay');
  grunt.registerTask('default', ['build', 'mocha']);
};