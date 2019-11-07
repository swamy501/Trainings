var IssuesApi = require('../data/IssuesApi');
var express = require('express');
var router = express.Router();


router.get("/",function(req,res){
  console.log("get localhost:3000/issues is called"+req.method);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  IssuesApi.getAllIssues(function(err,items){
     res.json(items);
   });
});

router.get("/:id",function(req,res){
  console.log("get localhost:3000/issues is called"+req.method);
  console.log('id = '+req.params.id);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
   IssuesApi.getIssueById(req.params.id,function(err,issue){
     res.json(issue);
   });
});

router.post("/create",function(req,res){
  console.log("create get localhost:3000/issues is called");
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Accept', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,X-My-Custom-Header, X-Another-Custom-Header');

  console.log('add issue ....'+req.body.Description);
  var issue = {};
  issue.summary = req.body.summary;
  issue.Description = req.body.Description;
  issue.severity = req.body.severity;
  issue.status = req.body.status;
  issue.createdDate = req.body.createdDate;
  issue.resolvedDate = req.body.resolvedDate;
  issue.Assignee = req.body.Assignee;

  IssuesApi.saveIssue(issue,function(err, issue){
    console.log('An issue added');
    res.json('{1}');
  });
});

router.put("/:id", function(req,res){
  console.log("put method localhost:3000/issues/id is called");
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  var issue = {};
  issue.summary = req.body.summary;
  issue.Description = req.body.Description;
  issue.severity = req.body.severity;
  issue.status = req.body.status;
  issue.createdDate = req.body.createdDate;
  issue.resolvedDate = req.body.resolvedDate;
  issue.Assignee = req.body.Assignee;
  IssuesApi.updateIssueById(req.params.id,issue,function(err){
    console.log('Issue updated. ID ='+req.params.id);
    });
});

router.delete("/:id", function(req,res){
  console.log("Delete method");
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  IssuesApi.deleteIssueById(req.params.id,function(err){
    console.log("deleted issue ID ="+req.params.id);
  })
});
module.exports = router;
