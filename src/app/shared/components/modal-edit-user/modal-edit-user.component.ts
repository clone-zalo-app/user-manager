import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../../core/models/user.model";
import {Subject} from "rxjs";
import {MDBModalRef} from "angular-bootstrap-md";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";

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
  roles: any[] = [
    {value: true, name: 'ADMIN'},
    {value: false, name: 'MEMBER'}
  ]

  constructor(public modalRef: MDBModalRef, private fb: FormBuilder, private userService: UserService) {
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get firstname() {
    return this.registerForm.get('firstname');
  }

  get lastname() {
    return this.registerForm.get('lastname');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get role() {
    return this.registerForm.get('role');
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      phone: ['', Validators.required]
    });
    this.registerForm.patchValue({role: false})
    if (this.editUser) {
      this.registerForm.patchValue({
        email: this.editUser.email,
        firstname: this.editUser.firstName,
        lastname: this.editUser.lastName,
        username: this.editUser.userName,
        role: this.editUser.admin,
        phone: this.editUser.phone
      })
    }
  }

  onCreateUser() {
    const registerInfo: UserModel = {
      phone: this.phone.value,
      email: this.email.value,
      admin: this.role.value,
      userName: this.username.value,
      lastName: this.lastname.value,
      firstName: this.firstname.value,
      enable: true
    }
    this.userService.createUser(registerInfo).subscribe(res => {
      console.log(res);
      this.saveButtonClicked.next(registerInfo);
    }, error => console.log(error))
    this.loading = true;
    this.error = false;

  }

  onDeleteUser() {
    this.userService.deleteUser(this.editUser._id).subscribe(res => {
      console.log(res);
    })
  }
}
