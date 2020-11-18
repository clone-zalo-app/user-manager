import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CommonService} from "../core/services/common.service";
import {environment} from "../../environments/environment";
import {UserModel} from "../core/models/user.model";
import * as CONST from '../core/constants';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private commonService: CommonService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    let userInfo:UserModel =  this.commonService.getLocalStorage(CONST.LocalStorage.USER);
    const token = this.commonService.getLocalStorage(CONST.LocalStorage.TOKEN);
    const isLoggedIn = userInfo && token;
    const isApiUrl = request.url.startsWith(environment.backend_url);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
