import { Component, OnInit } from '@angular/core';
import {RegistrationService} from "../../service/data/user/registration.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SharingService} from "../../service/outil/sharing.service";

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  passwordConfirm: string;
  userName: string;
  registrationFail: boolean;
  errorMessage: string;
  regForm: FormGroup;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private regService: RegistrationService,
    private router: Router,
    private sharingService: SharingService
    ) {
    this.regForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]{3,}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'passwordConfirm')
    });
  }

  get f() { return this.regForm.controls; }

    ngOnInit(): void {
    }

  handleRegistration() {
    if(this.regForm.valid) {
      this.regService.userRegistration(this.regForm.value['email'].trim(), this.regForm.value['userName'].trim(), this.regForm.value['password'], this.regForm.value['passwordConfirm'])
        .subscribe(
          data => {
            this.sharingService.shareObj("regSuccess");
            this.router.navigate(['auth']);
            this.registrationFail = false;
          },
          error => {
            this.errorMessage = error.error.message;
            this.registrationFail = true;
          }
        )
    }
  }

  register() {
    this.submitted = true;
  }
}
