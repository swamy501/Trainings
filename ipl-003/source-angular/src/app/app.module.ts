import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent} from './app.component';
import { routing } from './app.routing';

import {HomeComponent} from './home/home.component';
import {IssuesComponent} from './issues/issues.component';
//import {IssueDetailComponent} from './issues/issuedetail.component';
import {AddIssueComponent} from './issues/addissue-form.component';
import {UpdateIssueComponent} from './issues/updateissue-form.component';
import {IssueFilterPipe} from './issues/issue-filter.pipe';
import {IssueService} from './issues/issues.service';

@NgModule({
  imports: [BrowserModule,FormsModule,HttpModule,routing,HttpClientModule],
  declarations: [AppComponent,HomeComponent,IssuesComponent,AddIssueComponent,UpdateIssueComponent,IssueFilterPipe],
  providers: [IssueService],
  bootstrap: [AppComponent]
})

export class AppModule { }
