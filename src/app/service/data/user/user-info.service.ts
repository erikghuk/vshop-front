import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../../common/user";
import {API_URL} from "../../../app.constants";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private httpClient: HttpClient) { }

  getInfos() {
    return this.httpClient.get<User>(`${API_URL}/details/u/info`);
  }

  getUser() {
    return this.httpClient.get<User>(`${API_URL}/details/u/uname`);
  }



  getEmail() {
    return this.httpClient.get(`${API_URL}/accounts/u/email`);
  }
}
