var mongoose = require('mongoose');
var util = require('util'); // optional, just formatting / pretty print JSON string

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb', {useMongoClient: true});

var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Connection error', err);
});
db.once('open', function () {
  console.log('Connected to DB.');
});

var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    address: { street: String, city: String, state: String },
    phone: [Schema.Types.Mixed],
    likes: Array,
});

var User = mongoose.model('user', userSchema);

//============ COMPLEX SCHEMA - DELETE OPERATION ===============================
User.remove({name:"Scott"}, function (err, data) {
    if (err)
        return console.log(err);
    else {
        console.log("\n==> Data deleted");
    }
    db.close(function() {
        console.log('\nConnection closed.');
    });
});
