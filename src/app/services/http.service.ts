import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {GlobalsComponent, Error, User, Course, Video} from '../globals/globals.component';
import { Observable} from 'rxjs';
import {FileService} from "./file.service";
// import { Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HTTPService {

  constructor(private http: HttpClient, private _fileService: FileService) {}

  /*** login ***/
  login(email,pass): Observable<User> {
    return this.http.post<User>(GlobalsComponent.api + GlobalsComponent.version + 'login', {email, pass})
  }

  // Get oauth url from the API
  getOauth(): Observable<any> {
    return this.http.get<any>(GlobalsComponent.api + GlobalsComponent.version + 'oauth');
  }

  /*** login callback **/
  callback(code,pass):Observable<User> {
    return this.http.post<User>(GlobalsComponent.api + GlobalsComponent.version + 'callback', {code, pass})
  }

  /*** Users Info ***/
  getUserAct(id:number): Observable<User> {
    return this.http.get<User>(GlobalsComponent.api + GlobalsComponent.version + 'users/' + id); //, {withCredentials: true}
  }

  getCoursesInfo(ids:string[]): Observable<Course[]> {
    return this.http.post<Course[]>(GlobalsComponent.api + GlobalsComponent.version + 'courses/id', {id:ids}); //, {withCredentials: true}
  }

  getVideosInfo(ids:string[]): Observable<Video[]> {
    return this.http.post<Video[]>(GlobalsComponent.api + GlobalsComponent.version + 'videos/course', {courses:ids});
  }

  getProfessorsInfo(ids:number[]): Observable<User[]> {
    return this.http.post<User[]>(GlobalsComponent.api + GlobalsComponent.version + 'users/id', {id:ids});
  }

  /*** File uploads ***/
  uploadFile(videoForm, file){
    return this.http.post(GlobalsComponent.api + GlobalsComponent.version + 'videos', this._fileService.toFormData(videoForm, file),
        {reportProgress: true, observe: 'events'}
    )
  }
}