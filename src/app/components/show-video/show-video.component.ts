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
    this.videoID = this.route.snapshot.paramMap.get('id');
    console.log(this.videoID);
    console.log(this.route.snapshot);
  }

}
