import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable, Subscriber} from "rxjs";
import {UserModel} from "../models/user.model";
import * as CONST from '../constants';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  protected baseUrl = environment.backend_url;
  protected userSubject = new BehaviorSubject(this.getLocalStorage(CONST.LocalStorage.USER))
  currentUser: Observable<UserModel>;
  constructor(protected http: HttpClient) {
    this.currentUser = this.userSubject.asObservable();
  }

  get(url: string): Observable<any> {
    return this.http.get(this.baseUrl+url);
  }
  pos(url: string, request: any): Observable<any> {
    return  this.http.post(this.baseUrl+url, request);
  }
  patch(url: string, request: any): Observable<any> {
    return this.http.patch(this.baseUrl+url, request);
  }
  saveLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
    if (key == CONST.LocalStorage.USER) {
      this.userSubject.next(value);
    }
  }
  getLocalStorage(key: string): any{
    return JSON.parse(localStorage.getItem(key));
  }

}
