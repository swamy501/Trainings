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
    // DELETING a file in gridfs
    gfs.remove({ filename: 'Koala.jpg' }, function (err, gridStore) {
        if (err) return handleError(err);
        console.log('file deleted!');
		// close DB connection
		conn.db.close();
    });

});
