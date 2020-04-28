import { Component, OnInit } from '@angular/core';
import {Marque} from "../../common/marque";
import {MarqueService} from "../../service/data/vehicule/marque.service";
import {ModelService} from "../../service/data/vehicule/model.service";
import {Model} from "../../common/model";
import {GearBox} from "../../common/gear-box";
import {BoiteVitesseService} from "../../service/data/vehicule/boite-vitesse.service";
import {Year} from "../../common/year";
import {AnnoncesService} from "../../service/data/annonce/annonces.service";
import {AnnonceFilter} from "../../common/annonce-filter";
import {NavigationExtras, Router} from "@angular/router";
import {SharingService} from "../../service/outil/sharing.service";
import {Price} from "../../common/price";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  modelListHeadMessage = "< Choisissez";
  advanceSearchLink: string = "Recherche avancée";
  visibility: boolean = true;

  annonceFilter: AnnonceFilter;

  dateStart: Year;
  dateEnd: Year;

  priceStart: Price;
  priceEnd: Price;

  gearBox: GearBox;
  gearboxes: GearBox[];

  marques: Marque[];
  marque: Marque;

  models: Model[];
  model: Model;

  errorName: [];

  startPrice: number[];
  endPrice: number[];

  startYearsForDisplay: number[];
  endYearsForDisplay: number[];

  startKm: number[];
  endKm: number[];
  kmS: number;
  kmE: number;
  registerForm: FormGroup;



  constructor(
    private formBuilder: FormBuilder,
    private sharingService: SharingService,
    private router: Router,
    private marqueService: MarqueService,
    private modelService: ModelService,
    private boxService: BoiteVitesseService,
    private annoncesService: AnnoncesService
  ) {
    this.gearBox = new GearBox();
    this.dateStart = new Year();
    this.dateEnd = new Year();
    this.marque = new Marque();
    this.model = new Model();
    this.priceStart = new Price();
    this.priceEnd = new Price();
    this.annonceFilter = new AnnonceFilter();
  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      marque:[''], model: [''], yearS: [''], yearE: [''], prS: [''], prE: [''], kmS: [''],
      kmE: [''], gearbox: [''], motor: [''], cv: [''], etat: [''], carb: [''], color: ['']
    });

    // priceS initialization
    this.startPrice = Array.apply(0, {length: 51}).map(function(x,i){return (i*1000)});
    this.endPrice = Array.apply(0, {length: 50}).map(function(x,i){return (i*1000)});

    // km initialization
    this.startKm = Array.apply(0, {length: 101}).map(function (x,i) {return (i*10000)});
    this.endKm = Array.apply(0, {length: 101}).map(function (x,i) {return (i*10000)});

    // yearS initialization
    this.startYearsForDisplay = Array.apply(0, {length: 101}).map(function(x,i){return (i+1920)});
    this.endYearsForDisplay = Array.apply(0, {length: 101}).map(function(x,i){return (i+1920)});

    // marques initialization
    this.marqueService.getMarquesList().subscribe(
      marqueResponse=>this.handleMarqueResponse(marqueResponse),
      error => this.handleError(error)
    );
    // gearBox initialization (removed from DOM)
    this.boxService.getBoxList().subscribe(
      boxResponse=>this.handleBoxResponse(boxResponse),
      error => this.handleError(error)
    );

  }

  private handleMarqueResponse(response) {
    this.marques = response;
  }

  private handleModelResponse(response) {
    this.models = response;
  }

  private handleError(error) {
    this.errorName = error.error;
  }

  selectOption(event: any) {
    let marquesFromOption = event.target.value;
    if(marquesFromOption === '-1') {
      this.models = null;
      this.modelListHeadMessage = "< Choisissez";
      this.marque.marqueName = null;
      this.model.modelName = null;
    } else {
      this.marqueService.getMarqueById(marquesFromOption).subscribe(
        data => {
          this.marque.marqueName = data.marqueName;
          this.marque.id = data.id;
        }
      );
      this.modelListHeadMessage = "Choisissez";
      this.modelService.getModelsList(marquesFromOption).subscribe(
        modelResponse => this.handleModelResponse(modelResponse),
        error => this.handleError(error)
      );
    }
  }

  private handleBoxResponse(response) {
    this.gearboxes = response;
  }

  handleSearch() {
    if(this.kmS === undefined) {
      this.kmS = 0;
    }
    if(this.kmE === undefined) {
      this.kmE = 30000000;
    }
    this.annonceFilter.kmEnd = this.kmE;
    this.annonceFilter.kmStart = this.kmS;

    if(this.gearBox.boxName) {
      this.annonceFilter.gearbox = this.gearBox;
    } else {
      this.annonceFilter.gearbox = null;
    }

    if (this.priceStart.amount) {
      this.annonceFilter.priceStart = this.priceStart;
    } else {
      this.priceStart.amount = 0;
      this.annonceFilter.priceStart = this.priceStart;
    }

    if (this.priceEnd.amount) {
      this.annonceFilter.priceEnd = this.priceEnd;
    } else {
      this.priceEnd.amount = 2000000;
      this.annonceFilter.priceEnd = this.priceEnd;
    }

    if (this.dateStart.productionDate) {
      this.annonceFilter.dateStart = this.dateStart;
    } else {
      this.dateStart.productionDate = 1920;
      this.annonceFilter.dateStart = this.dateStart;
    }

    if (this.dateEnd.productionDate) {
      this.annonceFilter.dateEnd = this.dateEnd;
    } else {
      this.dateEnd.productionDate = 2020;
      this.annonceFilter.dateEnd = this.dateEnd;
    }

    this.annonceFilter.marque = this.marque.marqueName ? this.marque : null;
    this.annonceFilter.model = this.model.modelName ? this.model : null;

    this.router.navigate(['search-result', JSON.stringify(this.annonceFilter)]/*, { skipLocationChange: true }*/);
  }

  selectStartYear(event: any) {
    this.dateStart.productionDate = +event.target.value;
    let updatedYear = this.dateStart.productionDate;

    this.endYearsForDisplay = Array.apply(0, {length: 2021-event.target.value}).map(function(x,i){return (updatedYear + i)});
  }

  selectEndYear(event: any) {
    this.dateEnd.productionDate = +event.target.value;
  }

  selectModel(event: any) {
    this.model.modelName = event.target.value;
  }

  selectStartPrice(event: any) {
    this.priceStart.amount = +event.target.value;
    let updatedPrice = this.priceStart.amount;

    this.endPrice = Array.apply(0, {length: 50 - (updatedPrice/1000)}).map(function (x,i){return updatedPrice + i*1000});
  }

  selectEndPrice(event: any) {
    this.priceEnd.amount = +event.target.value;
  }

  toggle() {
    this.visibility = !this.visibility;
    this.advanceSearchLink = !this.visibility ? "Recherche de base" : "Recherche avancée";
  }

  selectGearBox(event: any) {
    this.gearBox.boxName = event.target.value;
  }

  selectKmS(event: any) {
    this.kmS = +event.target.value;
    let updatedKm = this.kmS;
    this.endKm = Array.apply(0, {length: 101 - (updatedKm/10000)}).map(function (x,i) {return updatedKm + i*10000})
  }

  selectKmE(event: any) {
    this.kmE = +event.target.value;
  }

  onReset() {
    this.models = null;
    this.registerForm.reset();
    this.visibility = true;
  }
}
