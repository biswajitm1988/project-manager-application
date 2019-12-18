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
  toggleParentTask: boolean;
  @Output() taskAdded = new EventEmitter<any>();

  constructor(private log: LogService,
              private taskManagerService: TaskManagerService,
              private router: Router, private route: ActivatedRoute,
              private location: Location,
              private modalService: NgbModal,
              private projectManagerService: ProjectManagerService) {

  }

  ngOnInit() {
    this.initializeTask();
    this.toggleParentTask = false;
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== '' && id != null) {
      this.isNew = false;
      this.log.info('[TaskFormComponent.ngOnInit] Id >> ', id);
      this.taskManagerService.getTaskByIdFromService(id).subscribe(task => {
        this.task = task;
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
    }
  }

  saveTask() {
    this.log.info('[TaskFormComponent.saveTask] Save >> ', this.task, this.isNew);
    if (this.isNew) {
      this.taskManagerService.addTask(this.task).subscribe(() => {
        this.router.navigate(['/viewTasks']);
        this.taskAdded.emit();
      });
    } else {
      this.taskManagerService.editTask(this.task).subscribe(() => {
        this.router.navigate(['/viewTasks']);
        this.taskAdded.emit();
      });
    }
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
      this.task.parentTask = res;
    }, (reason) => {
    });
  }
}
