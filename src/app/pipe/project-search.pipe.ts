import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectSearch'
})
export class ProjectSearchPipe implements PipeTransform {

  transform(projects: any[], searchText: string): any {
    if (!projects) { return null; }
    if (!searchText) { return projects; }
    if (searchText && Array.isArray(projects)) {
      searchText = searchText.toLowerCase();
      return projects.filter(item => {
        return JSON.stringify(item.projectName).toLowerCase().includes(searchText);
      });
    }
  }

}
