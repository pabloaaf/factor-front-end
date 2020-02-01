import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {GlobalsComponent, Error, User, Course, Video} from '../globals/globals.component';
import { Observable} from 'rxjs';
// import { Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HTTPService {

  constructor(private http: HttpClient) {}

  getUserAct(id:number): Observable<User> {
    return this.http.get<User>(GlobalsComponent.api + GlobalsComponent.version + '/users/' + id); //, {withCredentials: true}
  }

  getCoursesInfo(ids:string[]): Observable<Course[]> {
    return this.http.post<Course[]>(GlobalsComponent.api + GlobalsComponent.version + '/courses/id', {id:ids}); //, {withCredentials: true}
  }

  getVideosInfo(ids:string[]): Observable<Video[]> {
    return this.http.post<Video[]>(GlobalsComponent.api + GlobalsComponent.version + '/videos/course', {course:ids});
  }

  getProfessorsInfo(ids:number[]): Observable<User[]> {
    return this.http.post<User[]>(GlobalsComponent.api + GlobalsComponent.version + '/users/id', {id:ids});
  }
}