import {Routes, RouterModule} from '@angular/router';
// home component
import {HomeComponent} from './home/home.component';
// view issues component
import {IssuesComponent} from './issues/issues.component';
// detailed view of issue component
//import {IssueDetailComponent} from './issues/issuedetail.component';
//Add issue component
import {AddIssueComponent} from './issues/addissue-form.component';
//Edit issue component
import {UpdateIssueComponent} from './issues/updateissue-form.component';

const appRoutes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'issue', component:IssuesComponent},
  //{path: 'issues/:id', component: IssueDetailComponent},
  {path: 'addIssue',component: AddIssueComponent},
  {path: 'updateIssue/:id',component: UpdateIssueComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
