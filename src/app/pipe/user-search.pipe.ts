import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user';

@Pipe({
  name: 'userSearch'
})
export class UserSearchPipe implements PipeTransform {

  transform(users: any[], searchText?: string): any {
    if (!users) { return null; }
    if (!searchText) { return users; }
    if (searchText && Array.isArray(users)) {
      searchText = searchText.toLowerCase();
      return users.filter(item => {
        return item.firstName.toLowerCase().includes(searchText)
                || item.lastName.toLowerCase().includes(searchText)
                || item.employeeId.toLowerCase().includes(searchText);
      });
    } else {
      return users;
    }
  }
}
