import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ModelsComponent, Error, User, Course, Video} from '../models/models.component';
import { BehaviorSubject, Observable} from 'rxjs';
import { FileService } from './file.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
// ToDo don't send request if empty parameters
  constructor(private http: HttpClient, private _fileService: FileService) {
    const token = localStorage.getItem('token');
    if (token && token !== null && token !== '') {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(atob(token.split('.')[1])));
    } else {
      this.currentUserSubject = new BehaviorSubject<User>(new User());
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  toQuery(ids: string[]): string {
    let uri = '';
    if (ids.length > 0) {
      uri = '?';
    }
    for (let i of ids) {
      uri += 'ids=' + i + '&';
    }
    uri = uri.substr(0, uri.length - 1);
    return uri;
  }

  /*** login ***/
  login(email, pass): Observable<User> {
    return this.http.post<User>(ModelsComponent.api + ModelsComponent.version + 'auth', {email, pass})
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (user.authlvl > 0) {
          localStorage.setItem('token', user.token);
          this.currentUserSubject.next(JSON.parse(atob(user.token.split('.')[1])));
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  // Get oauth url from the API
  getOauth(): Observable<any> {
    return this.http.get<any>(ModelsComponent.api + ModelsComponent.version + 'auth');
  }

  /*** login callback **/
  callback(code, pass): Observable<User> {
    return this.http.post<User>(ModelsComponent.api + ModelsComponent.version + 'auth/callback', {code, pass})
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (user.authlvl > 0) {
          localStorage.setItem('token', user.token);
          this.currentUserSubject.next(JSON.parse(atob(user.token.split('.')[1])));
        }
        return user;
      }));
  }

  /*** Users Info ***/
  getUserAct(id: string): Observable<User> {
    return this.http.get<User>(ModelsComponent.api + ModelsComponent.version + 'users/' + id); // , {withCredentials: true}
  }

  getCoursesInfo(ids: string[]): Observable<Course[]> {
    const queryIDs = this.toQuery(ids);
    return this.http.get<Course[]>(ModelsComponent.api + ModelsComponent.version + 'courses' + queryIDs); // , {withCredentials: true}
  }

  getVideosInfo(ids: string[]): Observable<Video[]> {
    const queryIDs = this.toQuery(ids);
    return this.http.get<Video[]>(ModelsComponent.api + ModelsComponent.version + 'videos' + queryIDs);
  }

  getProfessorsInfo(ids: string[]): Observable<User[]> {
    const queryIDs = this.toQuery(ids);
    return this.http.get<User[]>(ModelsComponent.api + ModelsComponent.version + 'users' + queryIDs);
  }

  getVideoIdInfo(id: string): Observable<Video> {
    return this.http.get<Video>(ModelsComponent.api + ModelsComponent.version + 'videos/' + id);
  }

  editVideoIdInfo(id: string, courseID: string, name: string): Observable<Video> {
    return this.http.put<Video>(ModelsComponent.api + ModelsComponent.version + 'videos/' + id, {course: courseID, name: name});
  }

  getVideoTranscribes(id: string): Observable<any> {
    return this.http.get<any>(ModelsComponent.api + ModelsComponent.version + 'videos/' + id + '/transcriptions');
  }

  /*** File uploads ***/
  uploadFile(videoForm, file) {
    return this.http.post(ModelsComponent.api + ModelsComponent.version + 'videos', this._fileService.toFormData(videoForm, file),
        {reportProgress: true, observe: 'events'}
    );
  }
}
