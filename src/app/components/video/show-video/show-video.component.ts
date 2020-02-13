import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { HttpClient } from '@angular/common/http';
import {GlobalsComponent, User, Video} from "../../../globals/globals.component";
import {HTTPService} from "../../../services/http.service";

@Component({
  selector: 'app-show-video',
  templateUrl: './show-video.component.html',
  styleUrls: ['./show-video.component.css']
})
export class ShowVideoComponent implements OnInit {
  uri: string;
  //private videoID: string;
  userInfo: User;
  videoInfo: Video;
  constructor(private _httpService: HTTPService, private route: ActivatedRoute) {
    this.uri = GlobalsComponent.api+GlobalsComponent.version; //localhost
    let token = JSON.parse(atob(sessionStorage.getItem('token').split('.')[1]));
    this._httpService.getUserAct(token._id).subscribe(us => { // servicio http devuelve la info del usuario
      this.userInfo = <User>us;
      this._httpService.getVideoIdInfo(this.route.snapshot.paramMap.get('id')).subscribe(video => {
        this.videoInfo = <Video>video;
      });
    });
    // this.videoInfo = new Video();
  } //private route: ActivatedRoute

  ngOnInit() {
    /*let videoID = this.route.snapshot.paramMap.get('id');
    let token = sessionStorage.getItem('token');
    this.userInfo = JSON.parse(atob(token.split('.')[1]));
    this.getUserInfo();

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
*/
    /*if(this.route.snapshot.url[0].path == 'prof'){
      console.log('professor');
    } else {
      console.log('student');
    }*/

  }

/*  getUserInfo(){
    this.http.get(`${this.uri}users/` + this.userInfo._id).subscribe((data: any) => {
      this.userInfo = data;
      console.log(this.userInfo);
      this.getVideoInfo();
    }, (error: any) => {console.log(error);});
  }

  getVideoInfo(){
    this.http.post(`${this.uri}videos/id`,{id:this.videoID}).subscribe((data: any) => {
      this.videoInfo = data;
      console.log(this.videoInfo);
    }, (error: any) => {console.log(error);});
  }*/
}
