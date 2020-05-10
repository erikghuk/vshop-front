import { Component, OnInit } from '@angular/core';
import {Annonce} from "../../common/annonce";
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-annonce-display',
  templateUrl: './annonce-display.component.html',
  styleUrls: ['./annonce-display.component.css']
})
export class AnnonceDisplayComponent implements OnInit {
  annonce: Annonce;
  selectedImage: any;
  arrowLeft: any = 	"\uD83E\uDC70";
  eyeSimbol: any = "\uD83D\uDC41";

  constructor(
    private location: Location,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.authService = authService;
  }

  ngOnInit(): void {
    if(sessionStorage.getItem("lastSelectedAnnonce")) {
      this.annonce = JSON.parse(sessionStorage.getItem("lastSelectedAnnonce"));
      this.selectedImage = this.annonce.images[0]['url'];
    } else {
      this.router.navigate(['']);
    }

  }

  showImage(curImage) {
    this.selectedImage = curImage['url'];

  }
  contactMessage(annonce: Annonce) {
    if(this.authService.isUserLoggedIn()) {
      // navigate to contact page
    } else {
      this.router.navigate(["auth"]);
    }

  }

  backToSearchResult() {
    this.location.back();
  }

}
