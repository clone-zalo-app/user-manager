import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {LoginByEmailModel} from "../../../../core/models/login-by-email.model";
import {AuthService} from "../../../../core/services/auth.service";
import * as CONST from '../../../../core/constants';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error = false;
  loginSuccess = false;
  errorLabel: string;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService
  ) {
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    let loginReq: LoginByEmailModel = {
      email: this.username.value,
      password: this.password.value
    }
    this.loading = true;
    this.authService.loginByEmail(loginReq).subscribe(res => {
      this.error = false;
      this.loading = false;
      this.loginSuccess = false;
      if (res.status == 'fail') {
        this.error = true
        this.errorLabel = res.message
      } else {
        this.loginSuccess = true;
        this.authService.saveLocalStorage(CONST.LocalStorage.USER, res.data);
        setTimeout(() => {
          this.router.navigate(['dashboard'])
        },300)
      }
    })

  }

  getUserInfo() {

  }

}
