import { Component, OnInit } from '@angular/core';
import * as CONST from '../../../core/constants';
import {AuthService} from "../../../core/services/auth.service";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  routing = CONST.frontendUrl;
  user = true;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  logout() {
    this.authService.logout();
  }

}
