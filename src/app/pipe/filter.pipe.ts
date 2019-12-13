import { Pipe, PipeTransform, Injector, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})

@Injectable({
  providedIn: 'root'
})
export class FilterPipe implements PipeTransform {
  transform(tasks: any[], propertyName?: string, searchText?: string): any[] {
    if (!tasks) { return []; }
    if (!searchText) { return tasks; }
    return tasks.filter(task => {
      switch (propertyName) {
        case 'priorityGt':
          return task.priority >= searchText;
        case 'priorityLt':
          return task.priority <= searchText;
        case 'startDateInput':
          return  new Date(task.startDate) >= new Date(searchText);
        case 'endDateInput':
          return  new Date(task.endDate) <= new Date(searchText);
        case 'parentTaskSummary':
          return (task.parentTask.parentTaskSummary != null
                    && task.parentTask.parentTaskSummary !== 'undefined')
                    ? task.parentTask.parentTaskSummary.toLowerCase().indexOf(searchText.toLowerCase()) > -1
                    : false;
        default:
          return task[propertyName] !== 'undefined'
                    ? task[propertyName].toLowerCase().indexOf(searchText.toLowerCase()) > -1
                    : false;
      }
    }
    );
  }
}
