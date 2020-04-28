import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
  }

  handleLogin() {
    if(this.loginForm.valid) {
      this.authService.jwtAuthentication(this.loginForm.value['email'], this.loginForm.value['password'])
        .subscribe(
          data => {
            this.router.navigate(['profile']);
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

}
