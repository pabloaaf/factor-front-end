import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public userType: boolean = false;
  @Input() auth: number;

  constructor() {
  }

  ngOnInit() {
    if (this.auth >= 63) {
      this.userType = true;
      //console.log('professor');
    } else {
      this.userType = false;
      //console.log('student');
    }
  }
}