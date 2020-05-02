import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  faEdit = faEdit;
  clicked: boolean = false;
  clickedElemId: string;

  constructor() { }

  ngOnInit(): void {
  }

  click(event: any) {
    this.clickedElemId = (event.target.id);
    this.clicked = !this.clicked;
  }

  cancel($event: any) {
    this.clickedElemId = null;
    this.clicked = false;
  }

  deleteAccount() {

  }
}
