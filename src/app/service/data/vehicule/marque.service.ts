import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Marque} from "../../../common/marque";
import {API_URL} from "../../../app.constants";

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  constructor(private client: HttpClient) { }

  getMarquesList() {
    return this.client.get<Marque[]>(`${API_URL}/vh/marques`);
  }

  getMarqueById(marqueId: number) {
    return this.client.get<Marque>(`${API_URL}/vh/marques/${marqueId}`);
  }
}
