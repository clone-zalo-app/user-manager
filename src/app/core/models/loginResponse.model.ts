import {UserModel} from "./user.model";

export interface LoginResponseModel {
  status: string;
  message: string;
  data: UserModel
}
