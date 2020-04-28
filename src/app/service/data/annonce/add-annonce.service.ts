import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AnnonceFilter} from "../../../common/annonce-filter";
import {API_URL} from "../../../app.constants";
import {Annonce} from "../../../common/annonce";

@Injectable({
  providedIn: 'root'
})
export class AddAnnonceService {

  constructor(private client: HttpClient) { }

  addAnnonce(annonce: FormData) {
    return this.client.post<any>(`${API_URL}/annonces/sec/u`, annonce).pipe();
  }

}
