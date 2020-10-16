import { Injectable } from '@angular/core';
import {CommonService} from "./common.service";
import * as CONST from '../constants';
import {Observable} from "rxjs";
import {UserListResponseModel} from "../models/userListResponse.model";
@Injectable({
  providedIn: 'root'
})
export class UserService extends CommonService{
    getListUser():Observable<UserListResponseModel> {
      return this.get(CONST.ApiUrl.ADMIN.GET_LIST_USER);
    }
}
