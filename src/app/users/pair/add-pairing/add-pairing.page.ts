import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-pairing',
  templateUrl: './add-pairing.page.html',
  styleUrls: ['./add-pairing.page.scss'],
})
export class AddPairingPage implements OnInit {

  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  back() {
    this.modalController.dismiss();
  }

}
