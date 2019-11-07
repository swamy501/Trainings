import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {IssueService} from './issues.service';
import {Issue} from './issues';

@Component({
  selector: 'addissue-form',
  templateUrl: './addissue-form.component.html',
  styleUrls:['./addissue.css']
})

export class AddIssueComponent {
  statuses: string[] = ['Open','InProgress','Closed'];
  severities: string[] = ['Critical','High','Average','Low'];
  issue:any;
  private count =100;
  constructor(private _issuesService:IssueService,
              private router:Router) {}

  onSubmit(formValue:any) {
    console.log('Form Value ='+JSON.stringify(formValue,null,4));
    let newIssue = {
      //id: this.count+1,
      summary: formValue.summary,
      Description: formValue.description,
      severity: formValue.severity,
      status: formValue.status,
      createdDate: formValue.createdDate,
      resolvedDate: formValue.resolvedDate,
      Assignee: formValue.assignee
    }
    this._issuesService.addIssue(newIssue).subscribe(
      (data:any) => this.issue
    );
    this.router.navigate(['issue']);
  }

}
