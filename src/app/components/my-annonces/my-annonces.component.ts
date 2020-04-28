import { Component, OnInit } from '@angular/core';
import {Annonce} from "../../common/annonce";
import {AnnoncesService} from "../../service/data/annonce/annonces.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-annonces',
  templateUrl: './my-annonces.component.html',
  styleUrls: ['./my-annonces.component.css']
})
export class MyAnnoncesComponent implements OnInit {

  imageUrl: string;
  annonces: Annonce[];
  message: string;
  deleteButtonClicked: boolean = false;
  IDdeleteButtonClicked: number;

  constructor(
    private annonceService: AnnoncesService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.refreshAnnonces();
    this.imageUrl = "http://localhost:8080/img";
  }

  private refreshAnnonces() {
      this.annonceService.getAnnoncesByUserId().subscribe(
        result => {
          this.getAnnonces(result);
        },
        error => {
          this.handleError(error)
        }
      )
  }

  selectAnnonce(annonce: Annonce) {
    sessionStorage.removeItem("lastSelectedAnnonce");
    sessionStorage.setItem("lastSelectedAnnonce", JSON.stringify(annonce));
  }

  private getAnnonces(result) {
    this.annonces = result;
    if(!this.annonces) {
      this.message = "Vous n'avez pas encore des annonces";
    }
  }

  private handleError(error) {
    this.message = "Vous n'avez pas encore des annonces";
    this.annonces = [];
  }

  deleteAnnonce(annonceId) {
    this.deleteButtonClicked = true;
    this.IDdeleteButtonClicked = annonceId;

  }

  confirmDelete(annonceId) {
    if(annonceId < 0) {
      return;
    }
    this.annonceService.deleteAnnonceById(annonceId).subscribe(
      result => {
        this.refreshAnnonces();
      },
      error => this.message = "Un erreur est survenu. Reessayez"
    );

    this.deleteButtonClicked = false;
  }

  updateAnnonce(annonceId) {
    sessionStorage.setItem("curan_id", annonceId);
    this.router.navigate(['profile/u-annonces/upd']);
  }

  cancelDelete() {
    this.deleteButtonClicked = false;
    this.IDdeleteButtonClicked= -1;
  }
}
