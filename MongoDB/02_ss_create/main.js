var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb', {useMongoClient: true});

var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Connection error', err);
});
db.once('open', function () {
  console.log('Connected to DB.');
});

var myCollSchema = new mongoose.Schema({ x: Number }); // simple schema
var Coll = mongoose.model('coll', myCollSchema, 'myCollection');

// defining schema with collection name
// var myCollSchema = new mongoose.Schema({ x: Number }, { collection: 'myCollection' });
// alternate syntax to define model
// var Coll = db.model('coll', myCollSchema);

//============ SIMPLE SCHEMA - CREATE OPERATION ================================
var newColl = new Coll({
  x: 10
});

newColl.save(function (err, data) {
    if (err)
        return console.log(err);
    else
        console.log(data);

    db.close(function () {
        console.log('Connection closed.');
    });
});
