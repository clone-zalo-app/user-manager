import { Injectable } from '@angular/core';
import {CommonService} from "./common.service";
import {RegisterModel} from "../models/register.model";
import * as CONST from '../constants';
import {VerifyInfoModel} from "../models/verify-info.model";
import {LoginByEmailModel} from "../models/login-by-email.model";
import {Observable} from "rxjs";
import {LoginResponseModel} from "../models/loginResponse.model";
@Injectable({
  providedIn: 'root'
})
export class AuthService extends CommonService{

  registerByEmail(registerInfo: RegisterModel){
   return this.pos(CONST.ApiUrl.AUTH.REGISTER, registerInfo);
  }

  verifyCode(verifyInfo: VerifyInfoModel) {
    return this.patch(CONST.ApiUrl.AUTH.VERIFY, verifyInfo);
  }

  loginByEmail(loginInfo: LoginByEmailModel): Observable<LoginResponseModel> {
    return this.pos(CONST.ApiUrl.AUTH.LOGIN, loginInfo);
  }
  logout() {
    localStorage.removeItem(CONST.LocalStorage.USER);
    localStorage.removeItem(CONST.LocalStorage.TOKEN)
    this.userSubject.next(null);
  }
}
