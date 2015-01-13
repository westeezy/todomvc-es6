module.exports = {
  options: {
    livereload: true
  },
  js: {
    files: ['js/**/**/*.js'],
    tasks: ['jshint']
  },
  test: {
    files: ['test/**/*.js'],
    tasks: ['mocha']
  }
};