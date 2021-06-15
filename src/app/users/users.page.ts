import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.checkStorage();
  }

  checkStorage() {
    console.log(localStorage.getItem('uid'));
    console.log(localStorage.getItem('email'));
  }

}
