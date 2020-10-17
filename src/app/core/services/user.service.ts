import { Injectable } from '@angular/core';
import {CommonService} from "./common.service";
import * as CONST from '../constants';
import {Observable} from "rxjs";
import {UserListResponseModel} from "../models/userListResponse.model";
import {UserModel} from "../models/user.model";
@Injectable({
  providedIn: 'root'
})
export class UserService extends CommonService{
    getListUser():Observable<UserListResponseModel> {
      return this.get(CONST.ApiUrl.ADMIN.USER);
    }
    deleteUser(id: string) {
      return this.delete(CONST.ApiUrl.ADMIN.USER+`:${id}`)
    }
    createUser(userModal: UserModel) {
      return this.pos(CONST.ApiUrl.ADMIN.USER, userModal);
    }
}
