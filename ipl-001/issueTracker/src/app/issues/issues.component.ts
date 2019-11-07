import {Component, OnInit} from '@angular/core';
import {IssueService} from './issues.service';
import {Issue} from './issues';

@Component({
  selector: 'my-issue',
  templateUrl: './issues.component.html',
  styleUrls:['./issues.component.css']
})

export class IssuesComponent {
  title:string = 'Issues List';
  issues: any;

  constructor(private _issuesService:IssueService){}

  ngOnInit() {
    this.issues = this.getIssues();
  }

  getIssues() {
    this._issuesService.getIssues().subscribe(
      (issues:any) => this.issues = issues,
      err => console.log(err)
    );
  }

  deleteIssues(issueIDs: any) {
    for(let i=0;i<issueIDs.length;i++) {
      this._issuesService.deleteIssue(issueIDs[i]).subscribe(
        (data:any) => this.getIssues()
      );
    }
    //this.issues = this._issuesService.getIssues();
    console.log('List of issues after deletion = '+this.issues);
  }

  deleteIssue(issueID: any) {
    this._issuesService.deleteIssue(issueID).subscribe(
      (data:any) => this.getIssues()
    );
    //this.issues = this._issuesService.getIssues();
    console.log('List of issues after deletion = '+this.issues);
  }
}
