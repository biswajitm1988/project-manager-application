import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../model/user';
import { LogService } from '../service/log.service';
import { Router } from '@angular/router';
import { UserManagerService } from '../service/user-manager.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() user: User;
  @Output() public editUserData = new EventEmitter<User>();
  constructor(private log: LogService, private userManagerService: UserManagerService, private router: Router) {
  }

  ngOnInit() {
  }

  editUser(user: User) {
    this.log.info('[ViewUserComponent.editUser] Sending Data ' + user);
    this.editUserData.emit(user);
  }

  deleteUser(user: User) {
    this.log.info('[ViewUserComponent.editUser] Sending Data ' + user);
  }

}
