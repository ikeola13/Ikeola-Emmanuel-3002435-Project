import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pairings-modal',
  templateUrl: './pairings-modal.page.html',
  styleUrls: ['./pairings-modal.page.scss'],
})
export class PairingsModalPage implements OnInit {
  pairs = [] as any;
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
    this.afs.collection('pairings')
      .valueChanges().subscribe((data: any) => {
        console.log(data);
        this.pairs = data;
      });
  }
}
