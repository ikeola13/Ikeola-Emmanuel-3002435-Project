import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user;
  picture;

  constructor() { }

  ngOnInit() {
    this.user = localStorage.getItem('email');
    this.picture = localStorage.getItem('profile_picture');
  }

}
