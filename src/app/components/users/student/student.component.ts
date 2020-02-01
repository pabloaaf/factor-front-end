import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { HTTPService } from '../../../services/http.service';
import {Course, GlobalsComponent, User, Video} from "../../../globals/globals.component";
//import { Observable} from 'rxjs';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StdIndexComponent implements OnInit {
  private token:User;
  userInfo:User;
  coursesInfo:Course[];
  professorInfo:User[];
  videosInfo:Video[];
  uri:string;

  constructor(private _httpService: HTTPService) { //private _httpService: HTTPService private http: HttpClient,
    this.uri = GlobalsComponent.api+GlobalsComponent.version; //localhost
    this.token = JSON.parse(atob(sessionStorage.getItem('token').split('.')[1]));
    this._httpService.getUserAct(this.token._id).subscribe(us => { // servicio http devuelve la info del usuario
      this.userInfo = <User>us;
      this._httpService.getCoursesInfo(this.userInfo.coursesID).subscribe(courses => {
        this.coursesInfo = <Course[]>courses;
        let professorsID = [];
        for (let i = 0; i < this.coursesInfo.length; i++) {
          professorsID[i] = Number(this.coursesInfo[i].professorID);
        }
        this._httpService.getProfessorsInfo(professorsID).subscribe(prof => {
          this.professorInfo = <User[]>prof;
        });
      });
      this._httpService.getVideosInfo(this.userInfo.coursesID).subscribe(videos => {
        this.videosInfo = <Video[]>videos;
      });
    }, err => console.log(err));

  }

  ngOnInit() {

    //this.getUserInfo();
  }

  /*getUserInfo(){
    this.http.get(`${this.uri}/users/` + this.userInfo._id).subscribe((data: any) => {
      this.userInfo = data;
      console.log(this.userInfo);
      this.getCoursesInfo();
      this.getVideosInfo();
    }, (error: any) => {console.log(error);});
  }

  getCoursesInfo(){
    this.http.post(`${this.uri}/courses/id`,{id:this.userInfo.coursesID}).subscribe((data: any) => {
      this.coursesInfo = data;
      console.log(this.coursesInfo);
      let professorsID = [];
      for (let i = 0; i < this.coursesInfo.length; i++) {
        professorsID[i] = Number(this.coursesInfo[i].professorID);
      }
      this.getProfessorsInfo(professorsID);
    }, (error: any) => {console.log(error);});
  }

  getProfessorsInfo(PIDs) {
    this.http.post(`${this.uri}/users/id`,{id:PIDs}).subscribe((data: any) => {
      this.professorInfo = data;
      console.log(this.professorInfo);
    }, (error: any) => {console.log(error);});
  }

  getVideosInfo(){
    this.http.post(`${this.uri}/videos/course`,{course:this.userInfo.coursesID}).subscribe((data: any) => {
      this.videosInfo = data;
      console.log(this.videosInfo);
    }, (error: any) => {console.log(error);});
  }*/
}
