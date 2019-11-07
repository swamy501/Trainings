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

    // READING from gridfs
    // write content to file system
    var fs_write_stream = fs.createWriteStream('newKoala.jpg');
    // read from mongodb
    var readstream = gfs.createReadStream({ filename: 'Koala.jpg' });
    readstream.pipe(fs_write_stream);
    fs_write_stream.on('close', function () {
        console.log('file has been written fully!');
		// close DB connection
		conn.db.close();
    });
});
