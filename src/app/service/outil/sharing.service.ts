import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private sharingObj: any;

  constructor() { }

  getObj() {
    return this.sharingObj;
  }

  shareObj(obj) {
    this.sharingObj = obj;
  }
}
