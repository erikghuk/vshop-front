import { Component, OnInit } from '@angular/core';
import {Marque} from "../../common/marque";
import {AnnoncesService} from "../../service/data/annonce/annonces.service";
import {AnnonceFilter} from "../../common/annonce-filter";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reception-image',
  templateUrl: './reception-image.component.html',
  styleUrls: ['./reception-image.component.css']
})
export class ReceptionImageComponent implements OnInit {
  marques: Marque[];
  marque: Marque;
  private annonceFilter: AnnonceFilter;

  constructor(
    private router: Router,
    private annoncesService: AnnoncesService
  ) {
    this.annonceFilter = new AnnonceFilter();
    this.marque = new Marque();
  }

  ngOnInit(): void {

  }


  searchByMarque(currentMarqueName: string) {
    this.marque.marqueName =  currentMarqueName;
    this.handleSearch();
  }

  private handleSearch() {
    this.annonceFilter.marque = this.marque.marqueName ? this.marque : null;
    this.router.navigate(['search-result', JSON.stringify(this.annonceFilter)], { skipLocationChange: true });
  }
}
