import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegisterModel} from "../../../../core/models/register.model";
import {AuthService} from "../../../../core/services/auth.service";
import {VerifyInfoModel} from "../../../../core/models/verify-info.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  error = false;
  registerSuccess = false;
  verifyCode = false;
  errorMessage: string;
  code: string;
  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword:['', Validators.required]
    });
  }
  get username() {return this.registerForm.get('username'); }
  get password() {return this.registerForm.get('password'); }
  get email() {return this.registerForm.get('email'); }
  get firstname() {return this.registerForm.get('firstname'); }
  get lastname() {return this.registerForm.get('lastname'); }
  get rePassword() {return this.registerForm.get('rePassword'); }
  onRegister() {
    const registerInfo: RegisterModel = {
      email: this.email.value,
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      username: this.username.value,
      password: this.password.value
    }
    this.loading = true;
    this.error = false;
    this.authService.registerByEmail(registerInfo).subscribe(res => {
      this.loading = false;
      if (res.data.enable == false) {
        this.verifyCode = true;
      } else {
        this.errorMessage = 'Email đã được đăng ký'
      }
    }, error => {
      this.loading = false;
      this.error = true;
      this.errorMessage = error.error.message;
    })

  }
  onVerify() {
    const verifyInfo: VerifyInfoModel = {
      email: this.email.value,
      pass: this.code
    }
    this.authService.verifyCode(verifyInfo).subscribe(res => {
      this.router.navigate(['auth','login'])
    }, error => {
      console.log(error);
    })
  }

}
