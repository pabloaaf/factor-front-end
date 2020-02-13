import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userType:boolean = false;
  @Input() picture: string;
  @Input() auth: number;
  public picReady:boolean = false;

  constructor() {
    //this.picture = "";
  }

  ngOnInit() {
    if (this.picture) {
      this.picReady = true;
    }
    if(this.auth >= 63){
      this.userType = true;
      //console.log('professor');
    } else {
      this.userType = false;
      //console.log('student');
    }
  }

}