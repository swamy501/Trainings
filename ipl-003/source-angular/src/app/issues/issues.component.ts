import {Component, OnInit} from '@angular/core';
import {IssueService} from './issues.service';
import {Router} from '@angular/router';
import {Issue} from './issues';

@Component({
  selector: 'my-issue',
  templateUrl: './issues.component.html',
  styleUrls:['./issues.component.css']
})

export class IssuesComponent {
  title:string = 'Issues List';
  issues: any;
  dIssues: Array<number>= [];
  checkboxValue:boolean;
  private i = 0;

  constructor(private _issuesService:IssueService,private router:Router){}

  ngOnInit() {
    this.issues = this.getIssues();
    console.log('on in it Issues = '+this.issues);
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
    this.ngOnInit();
    //this.router.navigateByUrl('/issues');
  }

  captureID(issueID: any, isChecked: boolean) {
    console.log('checkboxValue = '+isChecked+ " issueID = "+issueID);
    if(isChecked){
      console.log("Checked Issue ID = "+issueID+" index "+this.i);
      this.dIssues[this.i] = issueID;
      this.i++;
      console.log('delete issues ID '+this.dIssues);
    }
  }

  deleteAllIssues(){
    console.log('in delete All issues');
    for(let i=0;i<this.dIssues.length;i++){
      console.log('deleted ID ='+this.dIssues[i]);
      this._issuesService.deleteIssue(this.dIssues[i]).subscribe(
        (data:any) => this.getIssues()
      );
      this.ngOnInit();
    }
  }
}
