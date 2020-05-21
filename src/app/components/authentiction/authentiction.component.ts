import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SharingService} from "../../service/outil/sharing.service";
import {constructExclusionsMap} from "tslint/lib/rules/completed-docs/exclusions";

@Component({
  selector: 'app-authentiction',
  templateUrl: './authentiction.component.html',
  styleUrls: ['./authentiction.component.css']
})
export class AuthentictionComponent implements OnInit {
  invalidLoginPass: boolean = false;
  errorMessage: String;
  loginForm: FormGroup;
  submitted = false;
  private redirectURL: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private sharingService: SharingService,
    private authService: AuthenticationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
  }

  handleLogin() {
    let email = this.loginForm.value['email'].toLowerCase();
    let pass = this.loginForm.value['password'];
    if(this.loginForm.valid) {
      this.authService.jwtAuthentication(email, pass)
        .subscribe(
          data => {
            if(this.authService.isAdmin) {
              this.router.navigate(['admin']);
            } else {
              // redirect the previous page after sign in
              let params = this.route.snapshot.queryParams;
              if (params['redirectURL']) {
                this.redirectURL = params['redirectURL'];
              }
              if (this.redirectURL) {
                this.router.navigateByUrl(this.redirectURL,)
                  .catch(() => this.router.navigate(['profile']));
              } else {
                this.router.navigate(['profile']);
              }
            }


            this.invalidLoginPass = false;
          },
          error => {
            this.loginForm.reset("password");
            this.loginForm.reset("email");
            this.errorMessage = error.error.message;
            this.invalidLoginPass = true;
          }
        )
    }
  }

  login() {
    this.submitted = true;
  }

  catchRegEvent() {
    return this.sharingService.getObj() === "regSuccess";
  }

  closeCatchRegEvent() {
    this.sharingService.shareObj(null);
  }
}
