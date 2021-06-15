import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.page.html',
  styleUrls: ['./users-modal.page.scss'],
})
export class UsersModalPage implements OnInit {
  users = [] as any;

  constructor(
    public modalController: ModalController,
    public afs: AngularFirestore,
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  back() {
    this.modalController.dismiss();
  }

  getUsers() {
    this.afs.collection('users', ref => ref.where('user_type', '==', 'user'))
      .valueChanges().subscribe((data: any) => {
        console.log(data);
        this.users = data;
      });
  }

}
