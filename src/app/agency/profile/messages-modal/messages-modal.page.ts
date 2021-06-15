import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-messages-modal',
  templateUrl: './messages-modal.page.html',
  styleUrls: ['./messages-modal.page.scss'],
})
export class MessagesModalPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  back() {
    this.modalController.dismiss();
  }

}
