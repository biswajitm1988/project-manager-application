import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { UserManagerService } from '../service/user-manager.service';
import { LogService } from '../service/log.service';
import { UserSearchPipe } from '../pipe/user-search.pipe';


@Component({
  selector: 'app-user-list-modal',
  templateUrl: './user-list-modal.component.html',
  styleUrls: ['./user-list-modal.component.css'],
  providers: [UserSearchPipe]
})
export class UserListModalComponent implements OnInit {
  user: User;
  users: User[];
  searchText: string;
  userId: number;
  constructor(public modal: NgbActiveModal, private log: LogService,
              private userManagerService: UserManagerService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userManagerService.getAllUsersFromService().subscribe((users) => {
      this.users = users;
      this.log.info('[UserListModalComponent.getAllUsers] View On Init. Users', this.users);
    });
  }

  sortUsers(prop: string) {
    const sortedUsers = this.users.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    return sortedUsers;
  }

}
