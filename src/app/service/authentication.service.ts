import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../app.constants";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

export const TOKEN ='jwtToken';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _isAdmin: boolean;
  private _roleName: string;

  constructor(private httpClient: HttpClient, private router: Router) {

  }

  jwtAuthentication(email, password) {
    return this.httpClient.post<any>(
      `${API_URL}/auth/login`, {
        email,
        password
      }).pipe(
      map(
        data => {
          if(data && data.jwtToken && data.roleName) {
            this._roleName = data.roleName;
            if(data.roleName && data.roleName === "ADMIN")
              localStorage.setItem("roleName", this._roleName);
          }
          this._isAdmin = data && data.jwtToken && data.roleName.indexOf("ADMIN") > -1;
          localStorage.setItem(TOKEN, `Bearer_${data.jwtToken}`);
        }
      )
    );
  }


  isUserLoggedIn() {
    let user = localStorage.getItem(TOKEN);
    return !(user === null);
  }

  logout() {
    return this.httpClient.post('http://localhost:8080/api/auth/logout', {}).pipe(
      map(
        data => {
          this._isAdmin = false;
        }
      )
    );
  }


  get isAdmin(): boolean {
    return !!localStorage.getItem("roleName");
  }
  get roleName(): string {
    return this._roleName;
  }
}
