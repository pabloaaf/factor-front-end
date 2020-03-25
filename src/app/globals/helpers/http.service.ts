import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ModelsComponent, Error, User, Course, Video} from '../models/models.component';
import { Observable} from 'rxjs';
import { FileService } from "./file.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private _fileService: FileService) {}

  /*** login ***/
  login(email,pass): Observable<User> {
    return this.http.post<User>(ModelsComponent.api + ModelsComponent.version + 'login', {email, pass})
  }

  // Get oauth url from the API
  getOauth(): Observable<any> {
    return this.http.get<any>(ModelsComponent.api + ModelsComponent.version + 'oauth');
  }

  /*** login callback **/
  callback(code,pass):Observable<User> {
    return this.http.post<User>(ModelsComponent.api + ModelsComponent.version + 'callback', {code, pass})
  }

  /*** Users Info ***/
  getUserAct(id:number): Observable<User> {
    return this.http.get<User>(ModelsComponent.api + ModelsComponent.version + 'users/' + id); //, {withCredentials: true}
  }

  getCoursesInfo(ids:string[]): Observable<Course[]> {
    return this.http.post<Course[]>(ModelsComponent.api + ModelsComponent.version + 'courses/id', {id:ids}); //, {withCredentials: true}
  }

  getVideosInfo(ids:string[]): Observable<Video[]> {
    return this.http.post<Video[]>(ModelsComponent.api + ModelsComponent.version + 'videos/course', {courses:ids});
  }

  getProfessorsInfo(ids:number[]): Observable<User[]> {
    return this.http.post<User[]>(ModelsComponent.api + ModelsComponent.version + 'users/id', {id:ids});
  }

  getVideoIdInfo(id:string):Observable<Video> {
    return this.http.post<Video>(ModelsComponent.api + ModelsComponent.version + 'videos/id', {id:id});
  }

  editVideoIdInfo(id:string, courseID:string, name:string):Observable<Video> {
    return this.http.put<Video>(ModelsComponent.api + ModelsComponent.version + 'videos/id', {id:id, course:courseID, name:name});
  }

  getVideoTranscribes(id:string):Observable<any> {
    return this.http.post<any>(ModelsComponent.api + ModelsComponent.version + 'videos/transcriptions/id', {id:id});
  }

  /*** File uploads ***/
  uploadFile(videoForm, file){
    return this.http.post(ModelsComponent.api + ModelsComponent.version + 'videos', this._fileService.toFormData(videoForm, file),
        {reportProgress: true, observe: 'events'}
    )
  }
}
