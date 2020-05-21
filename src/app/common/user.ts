import {UserInfo} from "./user-info";
import {Annonce} from "./annonce";
import {Account} from "./account";

export class User {
  id: number;
  userName: string;
  dateRegistration: Date;
  account: Account;
  userInfo: UserInfo;
  annonces: Annonce[];

}
