var browserify = require('browserify');
var react = require('react-tools');

module.exports = function(req, file, callback) {
    callback(null, {
        contentType: 'application/javascript',
        data: browserify(file).transform(function (file) {
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
