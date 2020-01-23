import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userType:boolean = false;
  @Input() picture: String;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.route.snapshot.url[0].path == 'prof'){
      this.userType = true;
      console.log('professor');
    } else {
      this.userType = false;
      console.log('student');
    }
  }

}