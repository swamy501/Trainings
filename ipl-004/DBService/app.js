var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/*+json'}));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/users', users);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb',{ useNewUrlParser: true });
// var db = mongoose.connection;
//
// db.on("error", function(err){
//   console.log('DB Connection error', err);
// });
//
// db.once("open",function(){
//   console.log("Connected to DB");
// });

var currentID = 100;
var issueSchema = new mongoose.Schema({
  id: Number,
  summary: String,
  Description: String,
  severity: String,
  status: String,
  createdDate: String,
  resolvedDate: String,
  Assignee: String
});

var Issue = mongoose.model('issue',issueSchema);
app.use(function(req,res,next){
  req.Issue = Issue;
  next();
});

app.get('/issues',function(req,res){
  console.log('Getting all issues');
  req.Issue.find({},function(err,issues){
    if(err)
      res.send(err);
    else {
      console.log(issues);
      res.json(issues);
    }
  });
});

app.get('/issues/:id',function(req,res){
  console.log('Getting Issue by ID...');
  req.Issue.findOne({id:req.params.id},function(err,issue){
    if(err)
      res.send(err);
    else {
      console.log(issue);
      res.json(issue);
    }
  });
});

app.put('/issues/:id',function(req,res){
  console.log('Update by issue ID..');
  req.Issue.findOneAndUpdate({id:req.params.id},
    {$set:
      {
  summary: req.body.summary,
  Description: req.body.Description,
  severity: req.body.severity,
  status: req.body.status,
  createdDate: req.body.createdDate,
  resolvedDate: req.body.resolvedDate,
  Assignee: req.body.Assignee
  }},
    {new:true},
    function(err,issue){
        if(err)
          res.send(err);
        else {
          console.log(issue);
          res.json(issue);
        }
    });
});

app.delete('/issues/:id',function(req,res){
  console.log('Delete by issue ID...');
  req.Issue.findOneAndRemove({id:req.params.id},
  function(err,issue){
    if(err)
      res.send(err);
    else {
      console.log(issue);
      res.json(issue);
    }
  });
});

app.post('/issues/create', function(req, res){
  console.log('Issue creating ....');
  var newIssue = new req.Issue();
  req.Issue.find({}, function(err,issues){
      if(err)
      console.log(err);
      else {
        console.log('Count = '+issues.length);
        currentID = currentID+issues.length;
        console.log('currentID = '+currentID);
        newIssue.id = currentID+1;
        console.log("New Issue ID="+newIssue.id);
        newIssue.summary = req.body.summary;
        newIssue.Description = req.body.Description;
        newIssue.severity = req.body.severity;
        newIssue.status = req.body.status;
        newIssue.createdDate = req.body.createdDate;
        newIssue.resolvedDate = req.body.resolvedDate;
        newIssue.Assignee = req.body.Assignee;
        newIssue.save(function(err,issue){
          if(err)
            res.send(err);
          else {
            console.log(issue);
            res.send(issue);
          }
        });
      }

  });

});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function(){
  console.log('Server on localhost:3000');
});
//module.exports = app;
