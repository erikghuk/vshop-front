import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {UserInfoService} from "../../service/data/user/user-info.service";
import {UserInfo} from "../../common/user-info";
import {User} from "../../common/user";
import {Account} from "../../common/account";
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  faEdit = faEdit;
  faPlus = faPlus;

  clicked: boolean = false;
  clickedElemId: string;

  account: Account;
  user: User;
  userInfo: UserInfo;
  fullName: string;
  tempUserName: string;
  tempEmail: string;
  deleteEvent: boolean;
  customMessage: string;
  dob: string;
  private tempDob: string;
  // --- for delete account --- //
  passwordDelete: string;
  // --- update password ----- //
  oldPass: string;
  newPass: string;
  newPassConfirm: string;
  private tempName: string;
  changementSuccess: boolean;
  accountUpdateForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userInfoService: UserInfoService
  ) {
    this.user = new User();
    this.userInfo = new UserInfo();
    this.account = new Account();
  }

  ngOnInit(): void {
    this.changementSuccess = false;
    this.userInfoService.getInfos().subscribe(
      result => {
        if(result != null && (result.firstName || result.lastName)) {
          this.userInfo.firstName = result.firstName;
          this.userInfo.lastName = result.lastName;
          this.fullName = UserInfoComponent.cleanup(this.userInfo.firstName + ' ' + this.userInfo.lastName);
          this.tempName = UserInfoComponent.cleanup(this.userInfo.firstName + ' ' + this.userInfo.lastName);
          this.userInfo.dob = result.dob;
          this.tempDob = result.dob;
        }
      }
    );

    this.userInfoService.getUser().subscribe(
      result => {
        if(result.userName) {
          this.user.userName = result.userName;
          this.user.dateRegistration = result.dateRegistration;
          this.tempUserName = result.userName;
        }
      }
    );

    this.userInfoService.getEmail().subscribe(
      result => {
        this.handleEmailResult(result);
      },
      error => console.log(error)
    )
  }
  private handleEmailResult(result) {
    this.account.email = result.message;
    this.tempEmail = result.message;
  }

  click(event: any) {
    this.clickedElemId = (event.target.id);
    this.clicked = !this.clicked;
  }

  cancel() {
    this.oldPass = null;
    this.newPass = null;
    this.newPassConfirm = null;

    this.fullName = this.tempName;

    this.deleteEvent = false;
    this.dob = null;
    this.customMessage = null;
    this.userInfo.dob = this.tempDob;
    this.user.userName = this.tempUserName;
    this.account.email = this.tempEmail;
    this.clickedElemId = null;
    this.clicked = false;
  }

  deleteAccount() {
    this.deleteEvent = true;
  }

  confirmDelete() {
    this.userInfoService.checkPassword(this.passwordDelete).subscribe(
      result => {
        if(result) {
          this.customMessage = null;
          this.authService.logout().subscribe(
            result => {
              this.deleteEvent = false;
              sessionStorage.clear();
              localStorage.clear();
              this.router.navigate(['']).then(() => setTimeout(() => window.location.reload(), 1000));
            }
          );
          this.userInfoService.deleteUser().subscribe(
            () => {
            }
          );
        } else {
          this.customMessage = "Mot de pass n'est pas valid";
        }
      }
    );
  }

//---------------------------UPDATE ACC-------------------------//

  updateUser(event) {
    if(this.user.userName) {
      this.customMessage = null;
      this.user.userName = UserInfoComponent.cleanup(this.user.userName);
      this.userInfoService.updateUser(this.user).subscribe(
        result => {
          this.user.userName = result.userName;
        },
        error => console.log(error.error.message)
      );
      this.clickedElemId = (event.target.id);
      this.clicked = !this.clicked;
    } else {
      this.customMessage = "Pseudo est obligatoire";
    }
  }

  updateUserDetails(event) {
    if(this.dob) {
      this.userInfo.dob = this.dob;
    }

    if(this.fullName && !this.dob) {
      this.fullName = UserInfoComponent.cleanup(this.fullName);
      let names = this.fullName.split(" ");
      this.userInfo.lastName = names[1];
      this.userInfo.firstName = names[0];
    } else {
      this.userInfo.lastName = undefined;
      this.userInfo.firstName = undefined;
    }
      this.userInfoService.updateUserInfo(this.userInfo).subscribe(
        result => {
          this.userInfo.firstName = result.firstName;
          this.userInfo.lastName = result.lastName;
          this.fullName = UserInfoComponent.cleanup(this.userInfo.firstName + ' ' + this.userInfo.lastName);
          this.clickedElemId = (event.target.id);
          this.clicked = !this.clicked;
        },
        error => {
          this.customMessage = "Le format n'est pas valid";
        }
      );
  }
  private static cleanup(message: string) {
    return message.trim().replace(/  +/g, ' ');
  }

  dobCapture(event) {
    this.dob = event.target.value;
    if(this.dob[this.dob.length-1] == '/') {
      this.dob = this.dob.slice(0, -1);
    }

    if(this.dob.length == 2) {
      this.dob = UserInfoComponent.validDate(this.dob, 31);
    }
    if(this.dob.length == 5) {
      this.dob = UserInfoComponent.validDate(this.dob, 12);
    }
    if(this.dob.length == 10) {
      this.dob = UserInfoComponent.validDate(this.dob, new Date().getFullYear());
    }
  }
  private static validDate(str, crit) {
    const numbers = /^[0-9]+$/;
    if(str.length == 10) {
      if(Number(str.substring(str.length-4, str.length)) > crit || Number(str.substring(str.length-4, str.length)) < 1900) {
        return str.slice(0, -4);
      } else {
        return str;
      }
    }
    if(Number(str.substring(str.length-2, str.length)) > crit || Number(str.substring(str.length-2, str.length)) < 1) {
      return str.slice(0, -2);
    } else {
      str += '/';
      return str;
    }
  }


  updateAccount(event) {
    if(!this.account.password) {
      this.customMessage = "Saisissez votre mot de passe pour faire cette modification";
    } else {
      this.customMessage = null;
      this.userInfoService.updateAccount(this.account).subscribe(
        result => {
          UserInfoComponent.handleUpdate(result);
          this.clickedElemId = (event.target.id);
          this.clicked = !this.clicked;
        },
        error => {
          this.customMessage = error.error.message;
          this.account.email = this.tempEmail;
          this.account.password = '';
        }
      );
    }
  }
  private static handleUpdate(result) {
    localStorage.removeItem('jwtToken');
    localStorage.setItem('jwtToken', `Bearer_${result.jwtToken}`);

  }


  updatePassword(event) {
    this.userInfoService.updatePassword(
      {
        'oldPassword': this.oldPass,
        'newPassword': this.newPass,
        'newPasswordConfirm': this.newPassConfirm
      }
      ).subscribe(
        result => {
          this.changementSuccess = true;
          this.clickedElemId = (event.target.id);
          this.clicked = !this.clicked;
        },
      error => {
          this.customMessage = error.error.message;
      }
    );
  }
}
