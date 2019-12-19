import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LogService } from '../service/log.service';
import { ProjectManagerService } from '../service/project-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectSearchPipe } from '../pipe/project-search.pipe';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css'],
  providers: [ProjectSearchPipe]
})
export class ProjectModalComponent implements OnInit {
  project: Project;
  projects: Project[];
  searchText: string;
  constructor(public modal: NgbActiveModal, private log: LogService,
              private projectManagetService: ProjectManagerService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectManagetService.getAllProjectsFromService().subscribe((projects) => {
      this.projects = projects;
      this.log.info('[ProjectModalComponent.getAllProjects] View On Init. Projects', this.projects);
    });
  }

  sortProjects(prop: string) {
    const sortedProjects = this.projects.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    return sortedProjects;
  }

}
