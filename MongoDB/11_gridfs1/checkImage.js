var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var fs = require('fs');

Grid.mongo = mongoose.mongo;
mongoose.Promise = global.Promise;
var conn = mongoose.createConnection('mongodb://localhost:27017/mydb');

// make sure the db instance is open before passing into `Grid`
conn.once('open', function () {
    console.log('DB connection open');
    var gfs = Grid(conn.db);

    // checking on file
    var options = { filename: 'Koala.jpg' };
    gfs.exist(options, function (err, found) {
        if (err) return handleError(err);
        found ? console.log('File exists\n') : console.log('File does not exist\n');
    });
    // file meta-data
    gfs.files.find({ filename: 'Koala.jpg' }).toArray(function (err, files) {
        if (err) {
            throw (err);
        }
        console.log(files);
		// close DB connection
		conn.db.close();
    });

});
