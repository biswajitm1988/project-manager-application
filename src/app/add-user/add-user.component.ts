import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { LogService } from '../service/log.service';
import { UserManagerService } from '../service/user-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSearchPipe } from '../pipe/user-search.pipe';
import { Subscription, Observable, of, timer  } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [UserSearchPipe]
})
export class AddUserComponent implements OnInit {
  isNew: boolean;
  user: User = new User();
  searchText: string;
  users: User[];
  message: string;
  successMessgae = 'User Details Saved Successfully';
  errorMessage = 'There was a problem in saving user details';
  showMessage: boolean;
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
          this.showAlertMessage(this.successMessgae, false);
          this.getAllUsers();
        }
      }
        , (err) => {
          this.showAlertMessage(this.errorMessage, true);
        });
    } else {
      this.userManagerService.editUser(this.user).subscribe((res) => {
        if (res.status === 201) {
          console.log(res);
          this.showAlertMessage(this.successMessgae, false);
          this.getAllUsers();
        }
      }
        , (err) => {
          this.showAlertMessage(this.errorMessage, true);
        });
    }
    this.user = new User();
    this.isNew = true;
  }

  getAllUsers() {
    this.userManagerService.getAllUsersFromService().subscribe((users) => {
      this.users = users;
      this.log.info('[ViewUserComponent.getAllUsers] View On Init. Users', this.users);
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

}