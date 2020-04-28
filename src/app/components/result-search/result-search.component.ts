import {Component, OnInit} from '@angular/core';
import {Annonce} from "../../common/annonce";
import {formatCurrency} from "@angular/common";
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
        error => console.log(error)
      )
    } else {
      this.countOfAnnonces = 0;
      console.log('Json has a Problem')
    }
  }

  ngOnInit(): void {

  }

  selectAnnonce(annonce: Annonce) {
    sessionStorage.removeItem("lastSelectedAnnonce");
    sessionStorage.setItem("lastSelectedAnnonce", JSON.stringify(annonce));
  }


}
