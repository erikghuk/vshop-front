import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Vehicle} from "../../common/vehicle";
import {Annonce} from "../../common/annonce";
import {Year} from "../../common/year";
import {Price} from "../../common/price";
import {ImageUrl} from "../../common/image-url";
import {IMAGES_MAX_COUNT} from "../../app.constants";
import {ActivatedRoute, Router} from "@angular/router";
import {AnnoncesService} from "../../service/data/annonce/annonces.service";

@Component({
  selector: 'app-upd-annonce',
  templateUrl: './upd-annonce.component.html',
  styleUrls: ['./upd-annonce.component.css']
})
export class UpdAnnonceComponent implements OnInit {
  vehicle: Vehicle;
  title: string;
  annonce: Annonce;
  year: Year;
  price: Price;
  annonceForm: FormGroup;
  submitted: boolean = false;
  private annonceId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private annonceService: AnnoncesService
  )
  {
    this.vehicle = new Vehicle();
    this.annonce = new Annonce();
    this.price = new Price();
    this.year = new Year();

    this.annonceForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      descr: ['', [Validators.required]],
      year: ['', Validators.required],
      price: ['', Validators.required],
      km: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.annonceId = sessionStorage.getItem('curan_id');
    sessionStorage.removeItem('curan_id');
    if(this.annonceId != null) {
      this.annonceService.getAnnoncesById(this.annonceId).subscribe(
        result => {
          if(result != null) {
            this.annonce = result;
            this.annonceForm.controls.title.setValue(this.annonce.title);
            this.annonceForm.controls.descr.setValue(this.annonce.description);
            this.annonceForm.controls.price.setValue(this.annonce.vehicle.price.amount);
            this.annonceForm.controls.year.setValue(this.annonce.vehicle.year.productionDate);
            this.annonceForm.controls.km.setValue(this.annonce.vehicle.km);
          }
        },
        error => console.log(error)
      );
    }

  }
  get f() {
    return this.annonceForm.controls; }

  annonceUpdate() {

  }

  updateAnnonce() {
    this.submitted = true;
    if(this.annonceForm.valid) {
      this.annonceService.updateAnnonce(this.annonceId, this.annonce).subscribe(
        result => {
          this.router.navigate(['profile/u-annonces']);
        },
        error => console.log(error)
      );
    }
  }

  selectPrice() {
    this.annonce.vehicle.price.amount = this.annonceForm.value['price'];
  }

  selectYear() {
    this.annonce.vehicle.year.productionDate = this.annonceForm.value['year'];
  }
  setDescription() {
    this.annonce.description = this.annonceForm.value['descr'];
  }

  setTitle() {
    this.annonce.title = this.annonceForm.value['title'];
  }

  setKm() {
    this.annonce.vehicle.km = this.annonceForm.value['km'];
  }

  cancel() {
    this.router.navigate(['profile/u-annonces']);
  }
}
