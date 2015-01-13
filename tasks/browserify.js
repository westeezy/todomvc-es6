var to5 = require("6to5ify"),
    fs = require('fs');

module.exports = (function(_this) {
    return function(grunt, options) {
        return {
            dev: {
                files: {
                    './dist/MyScript.js': ['./js/*.js']
                },
                options: { 
                    browserifyOptions: {
                        debug: true
                    },
                    transform: [to5],
                    postBundleCB: function(err, src, next) {
                        var to5Runtime = fs.readFileSync('node_modules/6to5/browser-polyfill.js', 'utf8');
                        var modSrc = to5Runtime + src;
                        next(err, modSrc);
                    }
                }
            }
        };
    };
})(this);