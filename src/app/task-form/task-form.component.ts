import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Task } from '../model/task';
import { TaskManagerService } from '../service/task-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParentTask } from '../model/parent-task';
import { LogService } from '../service/log.service';
import { Location } from '@angular/common';
import { UserListModalComponent } from '../user-list-modal/user-list-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectManagerService } from '../service/project-manager.service';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import { ParentTaskModalComponent } from '../parent-task-modal/parent-task-modal.component';
import { Project } from '../model/project';
import { User } from '../model/user';
import { Messages } from '../const/messages';
import { Subscription, Observable, timer } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  isNew: boolean;
  task: Task;
  errMsg: string;
  minStartDate: Date = new Date();
  toggleParentTask: boolean; message: string;
  showMessage: boolean;
  messages = new Messages();
  private subscription: Subscription;
  private timer: Observable<any>;
  isError: boolean;
  @Output() taskAdded = new EventEmitter<any>();

  constructor(private log: LogService,
              private taskManagerService: TaskManagerService,
              private router: Router, private route: ActivatedRoute,
              private location: Location,
              private modalService: NgbModal) {

  }

  ngOnInit() {
    this.initializeTask();
    this.toggleParentTask = false;
    const id = this.route.snapshot.queryParamMap.get('taskId');
    if (id !== '' && id != null) {
      this.isNew = false;
      this.log.info('[TaskFormComponent.ngOnInit] Id >> ', id);
      this.taskManagerService.getTaskByIdFromService(id).subscribe(result => {
        this.task = result.body;
        this.log.info('[TaskFormComponent.ngOnInit] Data fetched >> ', this.task);
        this.initializeTask();
      });
    }
  }

  initializeTask() {
    if (this.task == null) {
      this.task = new Task();
      this.task.parentTask = new ParentTask();
      this.task.project = new Project();
      this.task.user = new User();
      this.isNew = true;
    } else if (this.task.parentTask == null) {
      this.task.parentTask = new ParentTask();
    }
  }

  saveTask() {
    this.log.info('[TaskFormComponent.saveTask] Save >> ', this.task, this.isNew);
    if (this.toggleParentTask) {
      this.addParentTask();
      return;
    }
    if (this.isNew) {
      this.taskManagerService.addTask(this.task).subscribe((res) => {
        if (res.status === 201) {
          console.log(res);
          this.showAlertMessage(this.messages.addTasksuccessMessgae, false);
        }
      }
      , (err) => {
        this.showAlertMessage(this.messages.errorMessage, true);
      });
    } else {
      this.taskManagerService.editTask(this.task).subscribe((res) => {
        if (res.status === 201) {
          console.log(res);
          this.showAlertMessage(this.messages.editTasksuccessMessgae, false);
        }
      }
      , (err) => {
        this.showAlertMessage(this.messages.errorMessage, true);
      });
    }
  }

  addParentTask() {
    const parentTask = new ParentTask();
    parentTask.parentTaskSummary =  this.task.taskSummary;
    this.taskManagerService.addParentTask(parentTask).subscribe((res) => {
      if (res.status === 201) {
        console.log(res);
        this.showAlertMessage(this.messages.addTasksuccessMessgae, false);
      }
    }
    , (err) => {
      this.showAlertMessage(this.messages.errorMessage, true);
    });
  }

  openUserModal() {
    this.modalService.open(UserListModalComponent, { size: 'lg', scrollable: true }).result.then((res) => {
      this.task.user = res;
    }, (reason) => {
    });
  }

  openProjectModal() {
    this.modalService.open(ProjectModalComponent, { size: 'lg', scrollable: true }).result.then((res) => {
      this.task.project = res;
    }, (reason) => {
    });
  }

  openParentTaskModal() {
    this.modalService.open(ParentTaskModalComponent, { size: 'lg', scrollable: true }).result.then((res) => {
      if (!isNullOrUndefined(res.parentTaskSummary)) {
        this.task.parentTask = res;
      } else if (!isNullOrUndefined(res.taskSummary)) {
        if  (!this.isNew && this.task.taskId === res.taskId) {
          this.showAlertMessage(this.messages.parentSelectErrorMessage, true);
          return;
        }
        this.task.parentTask = new ParentTask();
        this.task.parentTask.parentTaskSummary = res.taskSummary;
      }
    }, (reason) => {
    });
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
