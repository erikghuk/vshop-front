import {Component, OnInit} from '@angular/core';
import {Annonce} from "../../common/annonce";
import {AnnoncesService} from "../../service/data/annonce/annonces.service";
import {ActivatedRoute} from "@angular/router";
import {AnnonceFilter} from "../../common/annonce-filter";

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.css']
})
export class ResultSearchComponent implements OnInit {
  imageUrl: string;
  annonces: Annonce[];
  countOfAnnonces: number;
  annonceFilter: AnnonceFilter;
  dropDowText: string = "Trier par";
  sortOrders: string[] = [
    "Plus récentes", "Plus anciennes",
    "Prix croissants", "Prix décroissants",
    "Km croissants", "Km décroissants",
    "Année croissants", "Année décroissants"
  ];


  constructor(
    private annonceService: AnnoncesService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(
      (result: AnnonceFilter) => {
        this.handleSearchResult(result);
      }
    )

  }

  private testJSON(text) {
    if (typeof text!=="string") {
      return false;
    }
    try {
      let temp = JSON.parse(text);
      return temp && typeof temp === "object";
    }
    catch (error){
      return false;
    }
  }

  private handleSearchResult(result) {
    if(this.testJSON(result['data'])) {
      this.annonceFilter = JSON.parse(result['data']);
      this.annonceService.getAnnoncesByFilter(this.annonceFilter).subscribe(
        result => {
          this.annonces = result;
          this.countOfAnnonces = this.annonces.length;

        },
        error => this.countOfAnnonces = 0
      )
    } else {
      this.countOfAnnonces = 0;
    }
  }

  ngOnInit(): void {

  }

  selectAnnonce(annonce: Annonce) {
    sessionStorage.removeItem("lastSelectedAnnonce");
    sessionStorage.setItem("lastSelectedAnnonce", JSON.stringify(annonce));
  }


  //"Plus récentes", "Plus anciennes",
  //     "Prix croissants", "Prix décroissants",
  //     "Km croissants", "Km décroissants",
  //     "Année croissants", "Année décroissants"

  sortByPrice(item: any) {
    this.dropDowText = item;
    switch (item) {
      case 'Plus récentes':
        this.annonces.sort((a, b) => Date.parse(b.creationDate) - Date.parse(a.creationDate));
        break;
      case 'Plus anciennes':
        this.annonces.sort((a, b) => Date.parse(a.creationDate) - Date.parse(b.creationDate));
        break;

      case 'Prix croissants':
        this.annonces.sort((a, b) => a.vehicle.price.amount - b.vehicle.price.amount);
        break;
      case 'Prix décroissants':
        this.annonces.sort((a, b) => b.vehicle.price.amount - a.vehicle.price.amount);
        break;
      case 'Année croissants':
        this.annonces.sort((a, b) => a.vehicle.year.productionDate - b.vehicle.year.productionDate);
        break;
      case 'Année décroissants':
        this.annonces.sort((a, b) => b.vehicle.year.productionDate - a.vehicle.year.productionDate);
        break;
      case 'Km croissants':
        this.annonces.sort((a, b) => +a.vehicle.km - +b.vehicle.km);
        break;
      case 'Km décroissants':
        this.annonces.sort((a, b) => +b.vehicle.km - +a.vehicle.km);
        break;

    }
  }
}
