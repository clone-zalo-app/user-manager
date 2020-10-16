import {NgModule} from '@angular/core';
import {MDBBootstrapModule, MDBModalRef} from 'angular-bootstrap-md';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import { ModalEditUserComponent } from './components/modal-edit-user/modal-edit-user.component';

@NgModule({
  declarations: [NotFoundComponent, ModalEditUserComponent],
  providers: [DatePipe, MDBModalRef],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MDBBootstrapModule,
    CommonModule,
    FormsModule,
    DatePipe
  ],

})
export class SharedModule {}
