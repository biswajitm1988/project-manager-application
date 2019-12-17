import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { LogService } from '../service/log.service';
import { UserManagerService } from '../service/user-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSearchPipe } from '../pipe/user-search.pipe';
import { Subscription, Observable, timer } from 'rxjs';
import { Messages } from '../const/messages';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [UserSearchPipe]
})
export class AddUserComponent implements OnInit {
  user: User = new User();
  users: User[];
  showModal: boolean;
  isNew: boolean;
  searchText: string;
  message: string;
  showMessage: boolean;
  messages = new Messages();
  private subscription: Subscription;
  private timer: Observable<any>;
  isError: boolean;

  constructor(private log: LogService,
              private userManagerService: UserManagerService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isNew = true;
    this.getAllUsers();
  }

  saveUser() {
    this.log.info('[UserFormComponent.saveUser] Save >> ', this.user, this.isNew);
    if (this.isNew) {
      this.userManagerService.addUser(this.user).subscribe((res) => {
        if (res.status === 200) {
          console.log(res);
          this.showAlertMessage(this.messages.addUsersuccessMessgae, false);
          this.getAllUsers();
        }
      }
        , (err) => {
          this.showAlertMessage(this.messages.errorMessage, true);
        });
    } else {
      this.userManagerService.editUser(this.user).subscribe((res) => {
        if (res.status === 201) {
          console.log(res);
          this.showAlertMessage(this.messages.editUsersuccessMessgae, false);
          this.getAllUsers();
        }
      }
        , (err) => {
          this.showAlertMessage(this.messages.errorMessage, true);
        });
    }
    this.user = new User();
    this.isNew = true;
  }

  getAllUsers() {
    this.userManagerService.getAllUsersFromService().subscribe((users) => {
      this.users = users;
      this.log.info('[AddUserComponent.getAllUsers] View On Init. Users', this.users);
    });
  }

  public setUserData(editUser: User) {
    this.user = editUser;
    this.isNew = false;
  }

  public showAlertMessage(message: string, isError: boolean) {
    this.showMessage = true;
    this.message = message;
    this.isError = isError;
    this.timer = timer(10000);
    this.subscription = this.timer.subscribe(() => {
      this.showMessage = false;
    });
  }

  sortUsers(prop: string) {
    const sortedUsers = this.users.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    return sortedUsers;
  }

  deleteUser(user: User) {
    this.log.info('[AddUserComponent.deleteUser] delete >> ', this.user);
    this.userManagerService.deleteUser(user).subscribe((res) => {
      if (res.status === 200) {
        console.log(res);
        this.showAlertMessage(this.messages.deleteUsersuccessMessgae, false);
        this.getAllUsers();
      }
    }
      , (err) => {
        this.showAlertMessage(this.messages.errorMessage, true);
      });
  }

}
