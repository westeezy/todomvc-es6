module.exports = {
    options: {
        compress: {
            drop_console: true
        }
    },

    target: {
        files: {
            'dist/MyScript.min.js': ['dist/MyScript.js']
        }
    }
};