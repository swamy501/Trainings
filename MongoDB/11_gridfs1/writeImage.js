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

    // WRITING to gridfs
    //filename to store in mongodb
    var writestream = gfs.createWriteStream({ filename: 'Koala.jpg' });
    fs.createReadStream('Koala.jpg').pipe(writestream);
    writestream.on('close', function (file) {
        console.log(file.filename + ' Written To DB');
		// close DB connection
        conn.db.close();
    });
});
