import {UserModel} from "./user.model";

export interface LoginResponseModel {
  status: string;
  message: string;
  data: data
}
export interface data {
  user: UserModel,
  token: string
}
