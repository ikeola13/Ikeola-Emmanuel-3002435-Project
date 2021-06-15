import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agents-modal',
  templateUrl: './agents-modal.page.html',
  styleUrls: ['./agents-modal.page.scss'],
})
export class AgentsModalPage implements OnInit {
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
    this.afs.collection('users', ref => ref.where('user_type', '==', 'agent'))
      .valueChanges().subscribe((data: any) => {
        console.log(data);
        this.users = data;
      });
  }

}
