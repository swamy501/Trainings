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

var newUser1 = new User({
    name: "Scott",
    age: 25,
    email: "scott@test.com",
    address: { street: '1 Jefferson St', city: 'NYC', state: 'NY' },
    phone: { office: 12345678 },
    likes: ['movies']
});

//============ COMPLEX SCHEMA - CREATE OPERATION ===============================
newUser1.save(function (err, user) {
    if (err)
        return console.log(err);
    else
        console.log(user);

    db.close(function () {
        console.log('Connection closed.');
    });
});
