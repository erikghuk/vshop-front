import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../app.constants";
import {map} from "rxjs/operators";
import * as jwt_decode from 'jwt-decode';

export const TOKEN ='jwtToken';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {}

  jwtAuthentication(email, password) {
    return this.httpClient.post<any>(
      `${API_URL}/auth/login`, {
        email,
        password
      }).pipe(
      map(
        data => {
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
    return this.httpClient.post('http://localhost:8080/api/auth/logout', {}).pipe();
  }
}
