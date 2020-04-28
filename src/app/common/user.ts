import {UserInfo} from "./user-info";

export class User {
  id: number;
  userName: string;
  dateRegistration: Date;
  token: string;
  userInfo: UserInfo;
}
