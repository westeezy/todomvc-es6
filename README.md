ES6 Version of [TodoMVC VanillaJS](https://github.com/tastejs/todomvc/tree/gh-pages/examples/vanillajs)


----------
## Build Process (Grunt) ##
[![Dependency Status](https://david-dm.org/westeezy/todomvc-es6.svg)](https://david-dm.org/westeezy/todomvc-es6)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
 - build => jshint -> browserify with 6to5 transform -> uglify
 - build-require => jshint -> 6to5 -> require
 - test => build to mocha
 - saucelabs
 - serve => connect at :8080
 - watch => jshint
 - default => build -> test
 

----------
## Tests ##
[![Build Status](https://travis-ci.org/westeezy/todomvc-es6.svg)](https://travis-ci.org/westeezy/todomvc-es6)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/westeezy.svg)](https://saucelabs.com/u/westeezy)
- Mocha with sinon spies. Grunt task to tests multiple browsers on saucelabs. Travis CI to track builds on push to master.


----------
## ES6 Features Used ##

 - Classes
 - Modules
 - Fat Arrow
 - Generators
 - Template Strings

