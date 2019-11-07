import {Pipe,PipeTransform} from '@angular/core';

@Pipe({name: 'issueFilter'})
export class IssueFilterPipe implements PipeTransform {
  transform(value: any[],args:string): any[] {
    let filter: string = args ? args.toLocaleLowerCase():null;

    return filter ? value.filter((issue)=>
    (issue.summary.toLocaleLowerCase().startsWith(filter)!= false) || (issue.Description.toLocaleLowerCase().startsWith(filter)!= false)):value;

  }
}
