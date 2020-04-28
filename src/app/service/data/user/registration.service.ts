import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../../app.constants";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) { }

  userRegistration(email, userName, password, passwordConfirm) {
    return this.httpClient.post<any>(
      `${API_URL}/auth/reg`, {
        email,
        password,
        passwordConfirm,
        userName
      }).pipe(
        map(
          data => {
            console.log(data);
          })
    )}
}
