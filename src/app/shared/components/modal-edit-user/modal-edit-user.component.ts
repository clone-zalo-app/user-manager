import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../core/models/user.model";
import {Subject} from "rxjs";
import {MDBModalRef} from "angular-bootstrap-md";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterModel} from "../../../core/models/register.model";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-modal-edit-user',
  templateUrl: './modal-edit-user.component.html',
  styleUrls: ['./modal-edit-user.component.scss']
})
export class ModalEditUserComponent implements OnInit {

  public editUser: UserModel;
  public saveButtonClicked: Subject<any> = new Subject<any>();

  registerForm: FormGroup;
  loading = false;
  error = false;
  registerSuccess = false;
  verifyCode = false;
  errorMessage: string;
  code: string;
  constructor(public modalRef: MDBModalRef,private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get username() {return this.registerForm.get('username'); }
  get password() {return this.registerForm.get('password'); }
  get email() {return this.registerForm.get('email'); }
  get firstname() {return this.registerForm.get('firstname'); }
  get lastname() {return this.registerForm.get('lastname'); }

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
}
