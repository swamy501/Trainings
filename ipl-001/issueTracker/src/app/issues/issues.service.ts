import {Injectable} from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import {Issue} from './issues';

import "rxjs/add/operator/map";

@Injectable()
export class IssueService {
  private _issuesURL = "http://localhost:3000/issues";
  private count: number;
  private issues: any;
  private issue: any;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };

  constructor(private _http:HttpClient) {}

  getIssues() {
    this.issues = this._http.get(this._issuesURL);
    return this.issues;
  }

  getCount() {
    return JSON.stringify(this.getIssues()).length;
  }

// jsonIssues() {
//   return  this._http.get(this._issuesURL).map(res=>res.json());
// }
 getIssue(id:any) {
 let issueURL = `${this._issuesURL}/${id}`;
 this.issue = this._http.get(issueURL);
 return this.issue;
   // console.log('ID=>'+id);
   // let issues = this.jsonIssues();
   // console.log("issues list ="+issues);
   // console.log("JSON::>"+JSON.stringify(issues));
   // let issue:any = null;
   // for(let i=0;i<issues.length;i++) {
   //   console.log("ID=>"+issues[i].id);
   //   if(issues[i].id === id) {
   //     issue = issues[i];
   //     break;
   //   }
   // }
   // return issue;
 }

 addIssue(newIssue:any) {
   return this._http.post(this._issuesURL,newIssue,this.httpOptions);
 }

 updateIssue(updatedIssue:any) {
   let id = updatedIssue.id;
   let updateIssueURL = `${this._issuesURL}/${id}`;
   return this._http.put(updateIssueURL, updatedIssue,this.httpOptions);
 }

 deleteIssue(id) {
   let deleteIssueURL = `${this._issuesURL}/${id}`;
   return this._http.delete(deleteIssueURL);
 }
}
