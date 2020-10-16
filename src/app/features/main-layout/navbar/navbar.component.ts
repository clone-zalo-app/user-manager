import { Component, OnInit } from '@angular/core';
import * as CONST from '../../../core/constants';
import {AuthService} from "../../../core/services/auth.service";
import {UserModel} from "../../../core/models/user.model";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  routing = CONST.frontendUrl;
  currentUser: UserModel;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(res => {
      this.currentUser = res;
    })
  }
  logout() {
    this.authService.logout();
  }

}
