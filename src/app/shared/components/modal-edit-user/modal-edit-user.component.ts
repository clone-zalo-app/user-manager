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
  verifyCode = false;
  errorMessage: string;
  code: string;
  loadSave = false;
  loadDelete = false;
  loadCreate = false;
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

    this.loadCreate = true;
    const registerInfo: UserModel = {
      phone: this.phone.value,
      email: this.email.value,
      admin: this.role.value,
      userName: this.username.value,
      lastName: this.lastname.value,
      firstName: this.firstname.value,
      enable: true,
      password: this.password.value
    }
    console.log(registerInfo);
    this.userService.createUser(registerInfo).subscribe(res => {
      console.log(res);
      this.loadCreate = false;
      this.saveButtonClicked.next(registerInfo);
    }, error => console.log(error))
    this.loadCreate = false;
    this.error = false;

  }

  onDeleteUser() {
    this.loadDelete = true;
    this.userService.deleteUser(this.editUser._id).subscribe(res => {
        this.loadDelete = false;
        this.modalRef.hide();
        this.saveButtonClicked.next(null);
    }, error => {
      this.loadDelete = false;
      this.errorMessage = error.error.message;
    })
  }
  onUpdateUser() {
    this.loadSave = true;
    const userInfo: UserModel = {
      phone: this.phone.value,
      email: this.email.value,
      admin: this.role.value,
      userName: this.username.value,
      lastName: this.lastname.value,
      firstName: this.firstname.value,
      enable: true,
      password: this.password.value
    }
    userInfo._id = this.editUser._id;
    this.userService.updateUser(userInfo).subscribe(res => {
      this.saveButtonClicked.next(userInfo);
      this.modalRef.hide();
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
      this.errorMessage = error.error.message;
    })
  }
}
