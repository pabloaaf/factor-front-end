import { Component,ViewChild,OnInit,ElementRef,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public phrases: Array<{start: number, end: number, p:string}> = [];
  @ViewChild('vid', {static: false}) video: ElementRef;

  constructor(private _httpService: HTTPService, private route: ActivatedRoute, private ref: ChangeDetectorRef) {
    this.uri = GlobalsComponent.api+GlobalsComponent.version; //localhost
    let token = JSON.parse(atob(sessionStorage.getItem('token').split('.')[1]));
    this._httpService.getUserAct(token._id).subscribe(us => { // servicio http devuelve la info del usuario
      this.userInfo = <User>us;
      this._httpService.getVideoIdInfo(this.route.snapshot.paramMap.get('id')).subscribe(video => {
        this.videoInfo = <Video>video;
        this._httpService.getVideoTranscribes(this.route.snapshot.paramMap.get('id')).subscribe(transcribes => {
          this.videoTranscribes = transcribes;
          let phraseAct = "";
          let startT = 0;
          let endT = 0;
          for (let i = 0; i < this.videoTranscribes.result.item.length; i++) {
            if(this.videoTranscribes.result.item[i].type == "punctuation"){
              phraseAct += this.videoTranscribes.result.item[i].alternatives[0].content;
              if(this.videoTranscribes.result.item[i+1] != undefined){
                endT = Number(this.videoTranscribes.result.item[i+1].start_time);
              } else{
                endT = Number.MAX_VALUE;
              }
              this.phrases.push({start:startT,end:endT,p:phraseAct});
              phraseAct = "";
              startT = endT;
            } else {
              phraseAct += " " + this.videoTranscribes.result.item[i].alternatives[0].content;
            }
          }
          console.log(this.phrases);
        });
      });
    });
  }

  ngOnInit() {}

  public setVideoTime(time:string) {
    this.video.nativeElement.currentTime = Number.parseInt(time);
    //console.log(this.video.nativeElement.currentTime);
    this.video.nativeElement.scrollIntoView({behavior:"smooth"});

  }

  public resetPhrase() {
    this.ref.detectChanges();
  }
}
