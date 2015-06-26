var browserify = require('browserify');
var react = require('react-tools');
var through = require('through');

module.exports = function(req, file, callback) {
    var toilet = this;
    try{
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
                    try{
                        var pipe = react.transform(data);
                    }catch(e){
                        console.error(e);
                        return this.queue(null);
                    }
                    
                    this.queue(pipe);
                    this.queue(null);
                };

            }).bundle().on('error', function(err){
                console.log(err);
                callback(err);
            })
        });
    } catch(e) {
        callback(e);
    }
};
