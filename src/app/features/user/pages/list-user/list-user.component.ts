import {Component, OnInit, ViewChild} from '@angular/core';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from "angular-bootstrap-md";
import {UserModel} from "../../../../core/models/user.model";
import {UserService} from "../../../../core/services/user.service";
import {ModalEditUserComponent} from "../../../../shared/components/modal-edit-user/modal-edit-user.component";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('tableEl') mdbTable: MdbTableDirective;
  modalRef: MDBModalRef;

  headElements: Array<string> = ['STT', 'Email' ,'First name', 'Last name', 'Phone', 'Username', 'Role' ,'Active'];
  elements: UserModel[] = [];
  constructor(private userService: UserService, private modalService: MDBModalService,) { }

  ngOnInit(): void {
    this.userService.getListUser().subscribe(value => {
      this.mdbTable.setDataSource(value.data);
      this.elements = this.mdbTable.getDataSource();
    })
  }

  editRow(el: UserModel) {
    const elementIndex = this.elements.findIndex((elem: UserModel) => el._id === elem._id);
    const modalOptions = {
      data: {
        editUser: el
      },
    };
    this.modalRef = this.modalService.show(ModalEditUserComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((userElement: UserModel) => {
      if (userElement) {
        this.elements[elementIndex] = userElement;
      } else {
        this.elements.splice(elementIndex,1);
      }
    });
    this.mdbTable.setDataSource(this.elements);
  }
  createUser() {
    this.modalRef = this.modalService.show(ModalEditUserComponent);
    this.modalRef.content.saveButtonClicked.subscribe((userElement: UserModel) => {
      this.elements.push(userElement)
    });
    this.mdbTable.setDataSource(this.elements);
  }

}
