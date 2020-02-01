import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userType:boolean = false;
  @Input() picture: String;
  @Input() auth: number;

  constructor() {
    this.picture = "";
  }

  ngOnInit() {
    if(this.auth >= 63){
      this.userType = true;
      //console.log('professor');
    } else {
      this.userType = false;
      //console.log('student');
    }
  }

}