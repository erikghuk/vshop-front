import { Component, OnInit } from '@angular/core';
import {AnnoncesService} from "../../service/data/annonce/annonces.service";
import {Annonce} from "../../common/annonce";
import {ImageUrl} from "../../common/image-url";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  first10Annonces: Annonce[] = [];
  currentThumbnailImage: string;
  constructor(
    private annonceService: AnnoncesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.annonceService.getNew10Annonces().subscribe(
      result => {
        this.first10Annonces = result;
      },
      error => this.first10Annonces = []
    );
  }

  selectAnnonce(annonce: Annonce) {
    sessionStorage.removeItem("lastSelectedAnnonce");
    sessionStorage.setItem("lastSelectedAnnonce", JSON.stringify(annonce));
    localStorage.clear();
    this.router.navigate(["search-result/annonce/" + annonce.id])
  }

  left() {
    this.first10Annonces.push(this.first10Annonces.shift());
  }

  right() {
    this.first10Annonces.unshift(this.first10Annonces.pop());
  }
}
