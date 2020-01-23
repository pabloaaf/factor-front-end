import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css']
})
export class EditVideoComponent implements OnInit {
  private videoID: number;
  userInfo: any;
  uri: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.uri = 'http://192.168.1.125:3000'; //localhost

  }

  ngOnInit() {
    this.videoID = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.videoID);
    let token = sessionStorage.getItem('token');
    this.userInfo = JSON.parse(atob(token.split('.')[1]));
    this.getUserInfo();
  }

  getUserInfo(){
    this.http.get(`${this.uri}/users/` + this.userInfo._id).subscribe((data: any) => {
      this.userInfo = data;
      console.log(this.userInfo);
    }, (error: any) => {console.log(error);});
  }
}