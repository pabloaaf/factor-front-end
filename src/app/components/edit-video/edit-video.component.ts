import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css']
})
export class EditVideoComponent implements OnInit {
  private videoID: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.videoID = this.route.snapshot.paramMap.get('id');
    console.log(this.videoID);
    console.log(this.route.snapshot);
  }
}