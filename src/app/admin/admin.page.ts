import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgentsModalPage } from './agents-modal/agents-modal.page';
import { ListingsModalPage } from './listings-modal/listings-modal.page';
import { PairingsModalPage } from './pairings-modal/pairings-modal.page';
import { TenancyModalPage } from './tenancy-modal/tenancy-modal.page';
import { UsersModalPage } from './users-modal/users-modal.page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(
    public modalController: ModalController,
    ) { }

  ngOnInit() {
  }

  async usersModal() {
    const modal = await this.modalController.create({
      component: UsersModalPage,
      cssClass: 'my-custom-class',
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
      });

    return await modal.present();
  }

  async agentsModal() {
    const modal = await this.modalController.create({
      component: AgentsModalPage,
      cssClass: 'my-custom-class',
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
      });

    return await modal.present();
  }

  async listingsModal() {
    const modal = await this.modalController.create({
      component: ListingsModalPage,
      cssClass: 'my-custom-class',
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
      });

    return await modal.present();
  }

  async pairingsModal() {
    const modal = await this.modalController.create({
      component: PairingsModalPage,
      cssClass: 'my-custom-class',
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
      });

    return await modal.present();
  }

  async tenancyModal() {
    const modal = await this.modalController.create({
      component: TenancyModalPage,
      cssClass: 'my-custom-class',
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
      });

    return await modal.present();
  }

}
