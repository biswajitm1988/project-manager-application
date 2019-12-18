import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user';

@Pipe({
  name: 'formatUserName'
})
export class FormatUserNamePipe implements PipeTransform {

  transform(user: User): any {
    if (!user) {return null; }
    if (!user.firstName && !user.lastName && !user.employeeId) {return null; }
    return user.firstName+" "+user.lastName+" - "+user.employeeId;
  }

}
