import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Issue} from './issues';

import {IssueService} from './issues.service';

@Component({
  selector:'updateissue-form',
  templateUrl:'./updateissue-form.component.html',
  styleUrls:['./updateissue.css']
})

export class UpdateIssueComponent {
  statuses: string[] = ['Open','InProgress','Closed'];
  severities: string[] = ['Critical','High','Average','Low'];
  id:number;
  issue:any;
  issues:any;

  constructor(private _issuesService:IssueService, private route:ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    this.route.params.forEach((params:Params) => {
      this.id = +params['id']
    });
    console.log('ID='+this.id);
    this.issues = this._issuesService.getIssue(this.id).subscribe(
      (issue:any) => this.issue = issue,
      err => console.log(" error = "+err)
    );
  }



  onSubmit(formValue: any) {
    console.log("Form Value = "+JSON.stringify(formValue,null,4));
    let updatedIssue = {
      id: this.id,
      summary: formValue.summary,
      Description: formValue.description,
      severity: formValue.severity,
      status: formValue.status,
      createdDate: formValue.createdDate,
      resolvedDate: formValue.resolvedDate,
      Assignee: formValue.assignee
    };
    console.log('updatedIssue='+updatedIssue);
    this._issuesService.updateIssue(updatedIssue).subscribe(
      (data:any) => this.issue
    );
    this.router.navigateByUrl('/issue');
  }
}
