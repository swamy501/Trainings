var IssuesApi = require('../data/IssuesApi');
var express = require('express');
var router = express.Router();


router.get('/',function(req,res){
  console.log('inside root issues');
  IssuesApi.getAllIssues(function(err,items){
    res.render('issues/index',{title:'Issues',issues: items});
  });
});

router.get('/create',function(req,res){
  res.render('issues/create');
});

router.post('/create',function(req,res){
  var issue = {};
  issue.description = req.body.description;
  issue.severity = req.body.severity;
  issue.status = req.body.status;
  issue.createdDate = req.body.createdDate;
  issue.resolvedDate = req.body.resolvedDate;

  IssuesApi.saveIssue(issue,function(err, issue){
    res.redirect('/issues');
  });
});

router.post('/deleteAll', function(req,res){
  console.log('IDs ===>'+req.body.ids);
  for(var i=0;i<req.body.ids.length;i++){
    IssuesApi.deleteIssueById(req.body.ids[i],function(err){
      console.log('Deleted Issue ID='+req.body.ids[i]);
    })
  }
  res.redirect('/issues');
});
router.get('/edit/:id',function(req,res){
  console.log('id = '+req.params.id);
  IssuesApi.getIssueById(req.params.id,function(err, issue){
    res.render('issues/edit',{issue:issue});
  });
});

router.post('/edit/:id',function(req,res){

  var updatedIssue = {};
  updatedIssue.description = req.body.description;
  updatedIssue.severity = req.body.severity;
  updatedIssue.status = req.body.status;
  updatedIssue.createdDate = req.body.createdDate;
  updatedIssue.resolvedDate = req.body.resolvedDate;
  IssuesApi.updateIssueById(req.params.id,updatedIssue,function(err){

    res.redirect('/issues');
  });
});

router.get('/delete/:id',function(req,res){
  IssuesApi.deleteIssueById(req.params.id,function(err){
    res.redirect('/issues');
  })
});

module.exports = router;
