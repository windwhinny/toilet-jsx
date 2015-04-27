var browserify = require('browserify');
var react = require('react-tools');
var through = require('through');

module.exports = function(req, file, callback) {
    var toilet = this;

    callback(null, {
        contentType: 'application/javascript',
        data: browserify({
            entries: file,
            paths: toilet.baseDir,
            extensions: ['.js', '.jsx', '.json']
        }).transform(function (file) {
            var data = '';
            return through(write, end);

            function write (buf) { data += buf }
            function end () {
                this.queue(react.transform(data));
                this.queue(null);
            }
        }).bundle()
    });
};
