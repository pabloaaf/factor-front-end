import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-video',
  templateUrl: './show-video.component.html',
  styleUrls: ['./show-video.component.css']
})
export class ShowVideoComponent implements OnInit {
  uri: string;
  private videoID: string;
  userInfo: any;
  videoInfo: any;
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.uri = 'http://192.168.1.125:3000'; //localhost

  } //private route: ActivatedRoute

  ngOnInit() {
    this.videoID = this.route.snapshot.paramMap.get('id');
    console.log(this.videoID);
    let token = sessionStorage.getItem('token');
    this.userInfo = JSON.parse(atob(token.split('.')[1]));
    this.getUserInfo();

    /*if(this.route.snapshot.url[0].path == 'prof'){
      console.log('professor');
    } else {
      console.log('student');
    }*/

  }

  getUserInfo(){
    this.http.get(`${this.uri}/users/` + this.userInfo._id).subscribe((data: any) => {
      this.userInfo = data;
      console.log(this.userInfo);
      this.getVideoInfo();
    }, (error: any) => {console.log(error);});
  }

  getVideoInfo(){
    this.http.post(`${this.uri}/videos/id`,{id:this.videoID}).subscribe((data: any) => {
      this.videoInfo = data;
      console.log(this.videoInfo);
    }, (error: any) => {console.log(error);});
  }
}
