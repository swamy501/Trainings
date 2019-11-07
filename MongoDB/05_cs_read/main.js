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

//============ COMPLEX SCHEMA - READ OPERATION =================================
User.find({name: 'Scott'}, function (err, user) {
    if (err)
        return console.log(err);
    else {
        console.log("\n==> Direct display");
        console.log(user);
        console.log("\n==> Normal output format");
        console.log(JSON.stringify(user));
        console.log("\n==> Pretty output format");
        console.log(util.inspect(user, {depth: null, colors: true})); // just to pretty print JSON
    }
    db.close(function() {
        console.log('\nConnection closed.');
    });
});
