import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../admin/service/admin.service";
import {User} from "../../../../common/user";

@Component({
  selector: 'app-users-control',
  templateUrl: './users-control.component.html',
  styleUrls: ['./users-control.component.css']
})
export class UsersControlComponent implements OnInit {
  users: User[];
  buttonMsg: string;
  userButtonClicked: any;
  status: string = "passive";


  constructor(private adminService: AdminService) {

  }

  ngOnInit(): void {
    this.buttonMsg = this.buttonMsg == "activer" ? "blocker" : "activer";
    this.adminService.getAllUsers().subscribe(
      result => {
        this.users = result;
      }
    )
  }


  userStatus(user: User) {
    user.account.active = !user.account.active;
    this.adminService.setUserStatus(user.account).subscribe(
      result => {
        this.status = result ? "active" : "passive";
      }
    );

    this.userButtonClicked = user.id;
  }
}
