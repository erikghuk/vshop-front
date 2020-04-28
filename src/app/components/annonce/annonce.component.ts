import { Component, OnInit } from '@angular/core';

import {Annonce} from "../../common/annonce";
import {Marque} from "../../common/marque";
import {MarqueService} from "../../service/data/vehicule/marque.service";
import {ModelService} from "../../service/data/vehicule/model.service";
import {BoiteVitesseService} from "../../service/data/vehicule/boite-vitesse.service";
import {GearBox} from "../../common/gear-box";
import {Model} from "../../common/model";
import {Vehicle} from "../../common/vehicle";
import {Year} from "../../common/year";
import {Price} from "../../common/price";
import {AddAnnonceService} from "../../service/data/annonce/add-annonce.service";
import {ImageUrl} from "../../common/image-url";
import {IMAGES_MAX_COUNT} from "../../app.constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {
  vehicle: Vehicle;

  gearbox: GearBox;
  gearboxes: GearBox[];

  marques: Marque[];
  marque: Marque;

  models: Model[];
  model: Model;


  title: string;
  description: string;
  annonce: Annonce;

  kilometrage: string;

  year: Year;

  price: Price;

  imageUrl: ImageUrl;
  imageArr: Array<ImageUrl> = [];

  errorImageCount: string;
  annonceForm: FormGroup;
  submitted: boolean = false;
  nameOfFileInput: string[] = [`Choisissez min 1 et max ${IMAGES_MAX_COUNT} images`];
  default: string = "Choisissez";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private annonceSendService: AddAnnonceService,
    private marqueService: MarqueService,
    private modelService: ModelService,
    private boxService: BoiteVitesseService,
  )
  {
    this.vehicle = new Vehicle();
    this.annonce = new Annonce();
    this.marque = new Marque();
    this.model = new Model();
    this.gearbox = new GearBox();
    this.price = new Price();
    this.year = new Year();

    this.annonceForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      descr: ['', [Validators.required]],
      marque: ['', [Validators.required]],
      model: ['', Validators.required],
      year: ['', Validators.required],
      price: ['', Validators.required],
      km: ['', Validators.required],
      box: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.marqueService.getMarquesList().subscribe(
      marqueResponse=>this.marques = marqueResponse
    );
    this.boxService.getBoxList().subscribe(
      boxResponse=>this.gearboxes=boxResponse
    );
  }

  get f() {
    return this.annonceForm.controls; }

  selectFile(event) {
    if (event.target.files.length > 0 && event.target.files.length < IMAGES_MAX_COUNT) {
      this.nameOfFileInput = [];
      this.imageArr = [];
      for (let i = 0; i < event.target.files.length; i++) {
        let image = event.target.files[i];
        this.imageUrl = new ImageUrl();
        this.imageUrl.urlName = image;
        this.imageArr.push(this.imageUrl);
        this.nameOfFileInput.push(" " + image['name']);
      }
    } else {
      this.errorImageCount = "Max nombre des images atteint le maximum"
    }
  }

  annonceUpload() {
    if(this.annonceForm.valid && this.model.modelName != 'Choisissez' && this.gearbox.boxName != 'Choisissez') {
      this.vehicle.model = this.model;
      this.vehicle.model.marque = this.marque;
      this.vehicle.gearbox = this.gearbox;
      this.vehicle.km = this.annonceForm.value['km'];
      this.vehicle.year = this.year;
      this.vehicle.price = this.price;

      this.annonce.title = this.annonceForm.value['title'];
      this.annonce.description = this.annonceForm.value['descr'];
      this.annonce.vehicle = this.vehicle;


      let formData = new FormData();

      formData.append('annonce', new Blob([JSON.stringify(this.annonce)], {
        type: "application/json"
      }));

      for (let i = 0; i < this.imageArr.length; i++) {
        formData.append("imageFiles", this.imageArr[i].urlName);
      }


        this.annonceSendService.addAnnonce(formData).subscribe(
          () => this.router.navigate(['profile'])
        );

    }
  }

  selectMarque(event: any) {
    let marqueFromOption = this.annonceForm.value['marque'];
    if(marqueFromOption === '') {
      this.models = null;
      this.marque.marqueName = null;
      this.model.modelName = null;
    } else {
      this.marqueService.getMarqueById(marqueFromOption).subscribe(
        data => {
          this.marque.marqueName = data.marqueName;
          this.marque.id = data.id;
        }
      );

      if (event.target.value === '') {
        this.models = null;
      } else {
        this.modelService.getModelsList(marqueFromOption).subscribe(
          modelResponse => this.models = modelResponse
        );
      }
    }
  }

  selectModel() {
    this.model.modelName = this.annonceForm.value['model'];

  }

  selectBox() {
    this.gearbox.boxName = this.annonceForm.value['box'];
  }

  addAnnonce() {
    this.submitted = true;
  }

  selectPrice() {
    this.price.amount = this.annonceForm.value['price'];
  }

  selectYear() {
    this.year.productionDate = this.annonceForm.value['year'];
  }
}
