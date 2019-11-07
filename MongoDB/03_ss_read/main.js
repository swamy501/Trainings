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

//============ SIMPLE SCHEMA - READ OPERATION ==================================
/* Using callback function */
/*
Coll.find({}, function (err, data) {
    if (err) return console.log(err);
    else {
        console.log("==> Using Callback function ...")
        console.log(data);
        // data.forEach(function(doc){
        //     console.log('x = ' + doc.x);
        // });
    }
    db.close(function () {
        console.log('Connection closed.');
    });
});
*/

/* using Promise style query
   when callback funciton is NOT passed, an instance of Query is returned */
var query = Coll.find({});
query.select({_id:0, x:1}); // using projection
query.exec()
    .then((data) => {
        console.log("==> Using Promise ...")
        console.log(data);
        db.close(function () {
            console.log('Connection closed.');
        });
    })
    .catch((err) => {
        console.log(err);
    })
