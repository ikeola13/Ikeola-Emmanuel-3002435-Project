import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListingModalPage } from '../../users/search/listing-modal/listing-modal.page';
import { AddListingPage } from './add-listing/add-listing.page';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';
import { LogicService } from 'src/app/logic.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.page.html',
  styleUrls: ['./listings.page.scss'],
})
export class ListingsPage implements OnInit {
  listings = [] as any;
  searchList = [] as any;

  constructor(
    public modalController: ModalController,
    private angularFireStorage: AngularFireStorage,
    public loadingController: LoadingController,
    private logicService: LogicService,
    public afs: AngularFirestore,
  ) { }

  ngOnInit() {
    this.getListings();
    this.searchList = [];
  }

  async listingModal(id, url) {
    const modal = await this.modalController.create({
      component: ListingModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        id,
        url
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
      });

    return await modal.present();
  }

  async addListingModal() {
    const modal = await this.modalController.create({
      component: AddListingPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
        this.getListings();
      });

    return await modal.present();
  }

  getListings() {
    this.afs.collection('listings', ref => ref.where('agent_id', '==', localStorage.getItem('uid')))
      .valueChanges().subscribe((data: any) => {
        console.log(data);
        this.listings = data;
      });
  }

  search(entry) {
    if (entry.target.value.length === 0) {
      this.getListings();
    } else {
      this.searchList = [];
      const dd = this.afs.collection('listings')
        .valueChanges().subscribe((data: any) => {
          dd.unsubscribe();
          console.log(data);
          for (const x of data) {
            if (x.address.toLowerCase().includes(entry.target.value.toLowerCase()) ||
              x.location.toLowerCase().includes(entry.target.value.toLowerCase()) ||
              x.type.toLowerCase().includes(entry.target.value.toLowerCase())) {
              this.searchList.push(x);
            }
          }
        });
      console.log(this.searchList);
      this.listings = this.searchList;
    }
  }

}
