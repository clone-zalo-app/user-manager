import {UserModel} from "./user.model";

export interface UserListResponseModel {
  status: string;
  message: string;
  data: UserModel[];
}
