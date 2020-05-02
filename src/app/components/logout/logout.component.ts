import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {Route, Router} from "@angular/router";
import {SharingService} from "../../service/outil/sharing.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private sharingService: SharingService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(this.authService.isUserLoggedIn()) {
      this.authService.logout().subscribe(
        result => {
          sessionStorage.clear();
          localStorage.clear();
          this.sharingService.shareObj(true);
          this.router.navigate(['']).then(() => setTimeout(() => window.location.reload(), 2000));
        }
      );
    }
  }

}
