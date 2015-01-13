module.exports = (function(_this) {
  return function(grunt, options) {
    return {
      all: {
        options: {
          urls: ['http://127.0.0.1:9999/test/runner.html'],
          username: 'westeezy',
          key: '28580c2b-e87b-4978-a579-a9b3b1bf35a1',
          browsers: grunt.file.readJSON('test/saucelabs-browsers.json'),
          build: process.env.TRAVIS_JOB_ID,
          testname: options.pkg.name,
          sauceConfig: {
            'video-upload-on-pass': false
          }
        }
      }
    };
  };
})(this);