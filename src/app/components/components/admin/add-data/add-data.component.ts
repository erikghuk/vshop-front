import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../admin/service/admin.service";
import {Marque} from "../../../../common/marque";
import {MarqueService} from "../../../../service/data/vehicule/marque.service";
import {Model} from "../../../../common/model";
import {ModelService} from "../../../../service/data/vehicule/model.service";

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {
  marque: Marque;
  marques: Marque[];

  model: Model;
  models: Model[];
  visibility: boolean = true;


  constructor(
    private adminService: AdminService,
    private marqueService: MarqueService,
    private modelService: ModelService
  ) { }

  ngOnInit(): void {
    this.marqueFinder();
    this.marque = new Marque();
    this.model = new Model();
  }

  private marqueFinder() {
    this.marqueService.getMarquesList().subscribe(
      marqueResponse => this.marques = marqueResponse
    );
  }

  addMarque() {
      this.adminService.addMarques(this.marque).subscribe(
        result => {
          this.marqueFinder();
        }
      );
  }

  addModelBlock(m: Marque) {
    this.marque = m;
    this.model.marque = this.marque;
    this.visibility = !this.visibility
  }

  addModel() {
    this.adminService.addModels(this.model).subscribe(
      result => {
        this.modelFinder();
      }
    );
  }

  private modelFinder() {

  }
}
