import { Component, Input } from '@angular/core';
import {User} from '../../models/models.component';
import {Router} from '@angular/router';
import {HttpService} from '../../helpers/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() picture: string;
  @Input() auth: number;
  currentUser: User;

  constructor(
    private router: Router,
    private _httpService: HttpService
  ) {
    this._httpService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this._httpService.logout();
    this.router.navigate(['/']);
  }

}
