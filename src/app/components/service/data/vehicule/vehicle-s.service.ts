import { Injectable } from '@angular/core';
import {GearBox} from "../../../../common/gear-box";
import {API_URL} from "../../../../app.constants";
import {HttpClient} from "@angular/common/http";
import {Carburant} from "../../../common/carburant";

@Injectable({
  providedIn: 'root'
})
export class VehicleSService {

  constructor(private httpClient: HttpClient) { }

  getCarbList() {
    return this.httpClient.get<Carburant[]>(`${API_URL}/vh/carbs`);
  }
}
