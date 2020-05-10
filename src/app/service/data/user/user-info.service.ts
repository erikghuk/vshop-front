import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../../common/user";
import {API_URL} from "../../../app.constants";
import {UserInfo} from "../../../common/user-info";
import {Account} from "../../../common/account";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private httpClient: HttpClient) { }

  getInfos() {
    return this.httpClient.get<UserInfo>(`${API_URL}/details/u/info`);
  }

  getUser() {
    return this.httpClient.get<User>(`${API_URL}/details/u/uname`);
  }

  getEmail() {
    return this.httpClient.get(`${API_URL}/accounts/u/email`);
  }

  updateUser(data) {
    return this.httpClient.put<User>(`${API_URL}/details/u/upd2`, data).pipe();
  }

  updateUserInfo(data) {
    return this.httpClient.put<UserInfo>(`${API_URL}/details/u/upd`, data).pipe();
  }

  updateAccount(data) {
    return this.httpClient.put(`${API_URL}/accounts/u/upd`, data).pipe();
  }

  deleteUser() {
    return this.httpClient.delete(`${API_URL}/accounts/u/del`);
  }

  checkPassword(passwordDelete: string) {
    return this.httpClient.post<boolean>(`${API_URL}/accounts/check`, passwordDelete);
  }

  updatePassword(data) {
    return this.httpClient.put(`${API_URL}/accounts/u/upd-parol`, data).pipe();
  }
}
