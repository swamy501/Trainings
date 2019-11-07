"use strict"

var issues = require('./issuesdata').issues;
var _=require("lodash");

var currentID = 100;
var _clone = function(item){
  return JSON.parse(JSON.stringify(item));
};

var IssuesApi = {
  getAllIssues: function(callback){
      callback(null,_clone(issues));
  },
  saveIssue: function(issue,callback){
    currentID = currentID +1;
    issue.id = currentID;
    issues.push(issue);
    callback(null,_clone(issue));
  },
  updateIssueById: function(id, issue, callback){
    var currentIssueIndex = _.indexOf(issues,_.find(issues,{id:parseInt(id)}));
    issue.id = parseInt(id);
    issues.splice(currentIssueIndex,1,issue);
    callback(null);
  },
  getIssueById: function(id, callback){
    var issue = _.find(issues,{id:parseInt(id)});
    callback(null,_clone(issue));
  },
  deleteIssueById: function(id,callback){
    _.remove(issues,{id:parseInt(id)});
    callback(null);
  }
};

module.exports = IssuesApi;
