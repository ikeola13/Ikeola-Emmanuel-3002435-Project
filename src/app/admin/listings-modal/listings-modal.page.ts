import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { ListingModalPage } from 'src/app/users/search/listing-modal/listing-modal.page';

@Component({
  selector: 'app-listings-modal',
  templateUrl: './listings-modal.page.html',
  styleUrls: ['./listings-modal.page.scss'],
})
export class ListingsModalPage implements OnInit {
  listings = [] as any;
  searchList = [] as any;

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
    this.afs.collection('listings')
      .valueChanges().subscribe((data: any) => {
        console.log(data);
        this.listings = data;
      });
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

  search(entry) {
    if (entry.target.value.length === 0) {
      this.getUsers();
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
