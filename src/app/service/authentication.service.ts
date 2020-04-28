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
    sessionStorage.clear();
    localStorage.clear();
    this.httpClient.post('http://localhost:8080/logout', {}).subscribe();
  }



  getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token)
      return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined)
      return false;

    return !(date.valueOf() > new Date().valueOf());
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined)
      return null;
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
}
