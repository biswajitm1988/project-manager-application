import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from '../model/project';
import { LogService } from './log.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {
  project: Project;
  projects: Project[];
  serviceURL: string = environment.PROJECT_MANAGER_SERVER_URL;

  constructor(private log: LogService, private http: HttpClient) {
    this.getAllProjectsFromService().subscribe((projects) => {
      this.projects = projects;
      this.log.info('[ProjectManagerService.constructor] Data >> ', this.projects);
    });
  }

  getAllProjectsFromService(): Observable<any> {
    this.log.info('[ProjectManagerService.getDataFromService] URL >> ', this.serviceURL + '/project/manager/getAllProjects');
    return this.http.get<Project[]>(this.serviceURL + '/project/manager/getAllProjects');
  }

  getAllProjects(): Project[] {
    this.log.info('[ProjectManagerService.getAllProjects] Data >> ', this.projects);
    return this.projects;
  }

  addProject(project: Project): Observable<any> {
    this.log.info('[ProjectManagerService.addProject] URL >> ', this.serviceURL + '/project/manager/addProject' + '  Project ', project);
    return this.http.post<Project>(this.serviceURL + '/project/manager/addProject', project, { observe: 'response' });
  }

  updateProject(project: Project): Observable<any> {
    this.log.info('[ProjectManagerService.addProject] URL >> ', this.serviceURL + '/project/manager/editProject' + '  Project ', project);
    return this.http.put<Project>(this.serviceURL + '/project/manager/editProject', project, { observe: 'response' });
  }
}
