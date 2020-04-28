import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Model} from "../../../common/model";
import {API_URL} from "../../../app.constants";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private httpClient: HttpClient) {}

  getModelsList(marqueId) {
    return this.httpClient.get<Model[]>(`${API_URL}/vh/models/${marqueId}`);
  }
}
