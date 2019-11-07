"use strict"

var issues = require('./issuesData').issues;
var _=require("lodash");
//const JSON = require('circular-json');

var severity = "{severity:[{'value':'Minor'},{'value':'Major'},{'value':'Critical'}]}";
var status = "{status:[{'value':'Open'},{'value':'InProgress'},{'value':'Closed'}]}";

var currentID = 3;
var _clone = function(item){
  return JSON.parse(JSON.stringify(item));
};

var IssuesApi = {
  getAllIssues: function(callback){
      callback(null,_clone(issues));
  },
  getIssueById: function(id, callback){
    var issue = _.find(issues,{id:parseInt(id)});
    callback(null,_clone(issue));
  },
  updateIssueById: function(id, issue, callback){
    var currentIssueIndex = _.indexOf(issues,_.find(issues,{id:parseInt(id)}));
    issue.id = parseInt(id);
    issues.splice(currentIssueIndex,1,issue);
    callback(null);
  },
  saveIssue: function(issue,callback){
    currentID = currentID +1;
    issue.id = currentID;
    issues.push(issue);
    callback(null,_clone(issue));
  },
  deleteIssueById: function(id,callback){
    _.remove(issues,{id:parseInt(id)});
    callback(null);
  }
};

module.exports = IssuesApi;
