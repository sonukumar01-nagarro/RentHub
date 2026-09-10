import { LoginModel } from "../login/login.model";

export interface RegisterModel extends LoginModel {
  confirmPassword: string;
}