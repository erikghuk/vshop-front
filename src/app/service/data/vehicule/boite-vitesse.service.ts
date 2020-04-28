import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../../app.constants";
import {GearBox} from "../../../common/gear-box";

@Injectable({
  providedIn: 'root'
})
export class BoiteVitesseService {

  constructor(private httpClient: HttpClient) { }

  getBoxList() {
    return this.httpClient.get<GearBox[]>(`${API_URL}/vh/gearboxes`);
  }
}
