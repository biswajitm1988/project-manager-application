import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  user: User;
  users: User[];
  serviceURL: string = environment.USER_MANAGER_SERVER_URL;

  constructor(private log: LogService, private http: HttpClient) {
    this.getAllUsersFromService().subscribe((users) => {
      this.users = users;
      this.log.info('[UserManagerService.constructor] Data >> ', this.users);
    });
  }

  getAllUsers(): User[] {
    this.log.info('[UserManagerService.getAllUsers] Data >> ', this.users);
    return this.users;
  }

  addUser(user: User): Observable<any> {
    this.log.info('[UserManagerService.addUser] URL >> ', this.serviceURL + '/user/manager/addUser' + '  User ', user);
    return this.http.post<User>(this.serviceURL + '/user/manager/addUser', user, { observe: 'response' });
  }

  editUser(user: User): Observable<any> {
    this.log.info('[UserManagerService.editUser] URL >> ', this.serviceURL + '/user/manager/updateUser' + '  User ', user);
    return this.http.put<User>(this.serviceURL + '/user/manager/updateUser', user, { observe: 'response' });
  }

  getAllUsersFromService(): Observable<any> {
    this.log.info('[UserManagerService.getDataFromService] URL >> ', this.serviceURL + '/user/manager/getAllUsers');
    return this.http.get<User[]>(this.serviceURL + '/user/manager/getAllUsers');
  }

  getUserByIdFromService(id: string): Observable<any> {
    this.log.info('[UserManagerService.getDataFromService] URL >> ', this.serviceURL + '/user/manager/getUserById/' + id);
    return this.http.get<User>(this.serviceURL + '/user/manager/getUserById/' + id, { observe: 'response' });
  }

  deleteUser(user: User): Observable<any> {
    this.log.info('[UserManagerService.deleteUser] URL >> ', this.serviceURL + '/user/manager/deleteUser/' + user.userId, user);
    return this.http.delete<User>(this.serviceURL + '/user/manager/deleteUser/' + user.userId, { observe: 'response' });
  }
}
