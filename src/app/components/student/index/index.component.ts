import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class StdIndexComponent implements OnInit {
  userInfo:any;
  coursesInfo:any;
  professorInfo:any;
  videosInfo:any;
  private uri:string;

  constructor(private http: HttpClient) {
    this.uri = 'http://192.168.1.125:3000'; //localhost
  }

  ngOnInit() {
    let token = sessionStorage.getItem('token');
    this.userInfo = JSON.parse(atob(token.split('.')[1]));
    this.getUserInfo();
  }

  getUserInfo(){
    this.http.get(`${this.uri}/users/` + this.userInfo._id).subscribe((data: any) => {
      this.userInfo = data;
      console.log(this.userInfo);
      this.getCoursesInfo();
      this.getVideosInfo();
    }, (error: any) => {console.log(error);});
  }

  getCoursesInfo(){
    this.http.post(`${this.uri}/courses/id`,{id:this.userInfo.courses}).subscribe((data: any) => {
      this.coursesInfo = data;
      console.log(this.coursesInfo);
      let professorsID = [];
      for (let i = 0; i < this.coursesInfo.length; i++) {
        professorsID[i] = Number(this.coursesInfo[i].professor);
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
    this.http.post(`${this.uri}/videos/course`,{course:this.userInfo.courses}).subscribe((data: any) => {
      this.videosInfo = data;
      console.log(this.coursesInfo);
    }, (error: any) => {console.log(error);});
  }
}
