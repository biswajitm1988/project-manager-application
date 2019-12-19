import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskManagerService } from '../service/task-manager.service';
import { LogService } from '../service/log.service';
import { Task } from '../model/task';
import { ParentTask } from '../model/parent-task';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-parent-task-modal',
  templateUrl: './parent-task-modal.component.html',
  styleUrls: ['./parent-task-modal.component.css']
})
export class ParentTaskModalComponent implements OnInit {

  parentTasks: ParentTask[];
  tasks: Task[];
  task: Task;
  parentTask: ParentTask;

  constructor(public modal: NgbActiveModal, private log: LogService,
              private taskManagerService: TaskManagerService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAllParentTasks();
    this.getAllTasks();
  }
  getAllTasks() {
    this.taskManagerService.getAllTasksFromService().subscribe((result) => {
      this.tasks = result.body;
      this.log.info('[ParentTaskModalComponent.getAllTasks] View On Init. Tasks', this.tasks);
    });
  }
  getAllParentTasks() {
    this.taskManagerService.getAllParentTasks().subscribe((result) => {
      this.parentTasks = result.body;
      this.log.info('[ParentTaskModalComponent.getAllParentTasks] View On Init. ParentTasks', this.parentTasks);
    });
  }

}
