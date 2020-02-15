import { Component,ViewChild,OnInit,ElementRef } from '@angular/core';
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
  videoTranscribes: any;
  @ViewChild('vid', {static: false}) video: ElementRef;

  constructor(private _httpService: HTTPService, private route: ActivatedRoute) {
    this.uri = GlobalsComponent.api+GlobalsComponent.version; //localhost
    let token = JSON.parse(atob(sessionStorage.getItem('token').split('.')[1]));
    this._httpService.getUserAct(token._id).subscribe(us => { // servicio http devuelve la info del usuario
      this.userInfo = <User>us;
      this._httpService.getVideoIdInfo(this.route.snapshot.paramMap.get('id')).subscribe(video => {
        this.videoInfo = <Video>video;
        console.log(this.video.nativeElement.currentTime);
        this.video.nativeElement.currentTime = 10;
        this._httpService.getVideoTranscribes(this.route.snapshot.paramMap.get('id')).subscribe(transcribes => {
          this.videoTranscribes = transcribes;
        });
      });
    });
  }

  ngOnInit() {}

  public setVideoTime(time:string) {
    this.video.nativeElement.currentTime = Number.parseInt(time);
    console.log(this.video.nativeElement.currentTime);
    this.video.nativeElement.scrollIntoView({behavior:"smooth"});

  }
}
