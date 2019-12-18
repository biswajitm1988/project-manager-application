import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../model/project';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() project: Project;
  @Output() editProjectDetails = new EventEmitter<Project>();
  @Output() suspendProjectDetails = new EventEmitter<Project>();

  constructor() { }

  ngOnInit() {
  }

  editProject(project: Project) {
    this.editProjectDetails.emit(project);
  }
  suspendProject(project: Project) {
    this.suspendProjectDetails.emit(project);
  }

}
