import {Component, OnInit} from '@angular/core';
import {UserInfoService} from "../../service/data/user/user-info.service";
import {AnnoncesService} from "../../service/data/annonce/annonces.service";
import {Annonce} from "../../common/annonce";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  message: string;
  errorName: string;
  annonces: Annonce[];
  countOFAnnonces: number = 0;

  constructor(
    private userInfoService: UserInfoService,
    private annonceService: AnnoncesService
  ) { }

  ngOnInit(): void {
      this.annonceService.getCountById().subscribe(
        count => {
          this.getCountOfAnnonces(count);
        },
        error => window.location.reload()
      );

      this.userInfoService.getInfos()
        .subscribe(
          response => this.handleResponse(response),
          error => this.handleError(error)
        );


  }

  private getCountOfAnnonces(result) {
    this.countOFAnnonces = result;
  }

  handleResponse(response) {
    if(response == null) {
      this.userInfoService.getUser().subscribe (
        response => this.message = response.userName,
        error => console.log("UserName problem from server: Look this error ===>>> " + error)
      )
    } else {
      this.message = response.firstName + ' ' + response.lastName;
    }
  }

  private handleError(error) {
    this.errorName = error.error;
  }

  private noAnnonces(result) {
    this.countOFAnnonces = 0;
    this.annonces = [];
  }
}
