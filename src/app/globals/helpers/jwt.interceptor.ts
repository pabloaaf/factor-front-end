import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { ModelsComponent } from '../models/models.component';
import {HttpService} from './http.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _httpService: HttpService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const currentUser = localStorage.getItem('token');
        const isApiUrl = request.url.startsWith(ModelsComponent.api);
        if (currentUser && isApiUrl) {
          request = request.clone({setHeaders: { Authorization: `Bearer ${currentUser}`}});
        }
        return next.handle(request);
    }
}
