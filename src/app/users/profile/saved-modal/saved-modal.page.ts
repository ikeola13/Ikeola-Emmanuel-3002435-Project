import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListingModalPage } from '../../search/listing-modal/listing-modal.page';

@Component({
  selector: 'app-saved-modal',
  templateUrl: './saved-modal.page.html',
  styleUrls: ['./saved-modal.page.scss'],
})
export class SavedModalPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async listingModal() {
    const modal = await this.modalController.create({
      component: ListingModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
    });

    return await modal.present();
  }

  back() {
    this.modalController.dismiss();
  }

}
