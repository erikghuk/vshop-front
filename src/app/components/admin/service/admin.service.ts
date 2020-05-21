import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../../app.constants";
import {User} from "../../../common/user";
import {Annonce} from "../../../common/annonce";
import {Account} from "../../../common/account";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get<User[]>(`${API_URL}/admin/users`);
  }

  getAccountsByUser() {
    return this.httpClient.get<User[]>(`${API_URL}/admin/accounts`);
  }

  getAnnoncesByUser() {
    return this.httpClient.get<Annonce[]>(`${API_URL}/admin/annonces`);
  }

  setUserStatus(acc: Account) {
    return this.httpClient.put<boolean>(`${API_URL}/admin/active`, acc).pipe();
  }
}
