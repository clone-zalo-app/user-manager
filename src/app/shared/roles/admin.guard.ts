import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../core/services/auth.service";
import {UserModel} from "../../core/models/user.model";
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  currentUser: UserModel;
  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(value => {
      this.currentUser = value
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.currentUser) {
      return this.currentUser.admin
    }
    return false;
  }

}
