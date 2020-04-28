import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AnnonceFilter} from "../../../common/annonce-filter";
import {API_URL} from "../../../app.constants";
import {Annonce} from "../../../common/annonce";

@Injectable({
  providedIn: 'root'
})
export class AnnoncesService {

  constructor(private client: HttpClient) { }

  getAnnoncesByFilter(filter: AnnonceFilter) {
    return this.client.post<Annonce[]>(`${API_URL}/annonces/vh/search`, filter).pipe()
  };

  getAnnoncesByUserId() {
    return this.client.get(`${API_URL}/annonces/sec/u/all`)
  }

  deleteAnnonceById(annonceId) {
    return this.client.delete(`${API_URL}/annonces/sec/${annonceId}`)
  }

  getCountById() {
    return this.client.get(`${API_URL}/annonces/sec/u/count`)
  }

  getAnnoncesById(annonceId: string) {
    return this.client.get<Annonce>(`${API_URL}/annonces/sec/${annonceId}`)
  }

  updateAnnonce(annonceId: string, annonce: Annonce) {
    return this.client.put<Annonce>(`${API_URL}/annonces/sec/${annonceId}`, annonce).pipe();
  }

  getNew10Annonces() {
    return this.client.get<Annonce[]>(`${API_URL}/annonces/latest`);
  }
}
