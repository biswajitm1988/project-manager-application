import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../model/user';
import { LogService } from '../service/log.service';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() user: User;
  tempUser: User;
  @Output() public editUserData = new EventEmitter<User>();
  @Output() delete = new EventEmitter<User>();
  constructor(private log: LogService, private modalService: NgbModal, private router: Router) {
  }

  ngOnInit() {
  }

  editUser(user: User) {
    this.log.info('[ViewUserComponent.editUser] Sending Data ' + user);
    this.tempUser = { ...user };
    this.editUserData.emit(this.tempUser);
  }

  openDeleteConfirmModal(user: User) {
    this.modalService.open(ConfirmModalComponent).result.then(() => {
      this.delete.emit(user);
    }, (reason) => {
    });
  }
}
