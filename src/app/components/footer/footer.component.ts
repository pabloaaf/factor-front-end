import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public userType:boolean = false;

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
