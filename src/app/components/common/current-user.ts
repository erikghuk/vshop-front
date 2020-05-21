import {Role} from "./role";

export class CurrentUser {
  private _role: Role;


  constructor(role: Role) {
    this._role = role;
  }

  get role(): Role {
    return this._role;
  }
}
