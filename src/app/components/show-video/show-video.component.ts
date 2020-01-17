import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-video',
  templateUrl: './show-video.component.html',
  styleUrls: ['./show-video.component.css']
})
export class ShowVideoComponent implements OnInit {
  private videoID: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.videoID = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.videoID);
    if(this.route.snapshot.url[0].path == 'prof'){
      console.log('professor');
    } else {
      console.log('student');
    }

  }

}
