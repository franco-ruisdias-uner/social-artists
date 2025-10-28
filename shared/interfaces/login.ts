import {IUser} from "@shared/models";

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: IUser;
}