import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterModalPage } from './filter-modal/filter-modal.page';
import { ListingModalPage } from './listing-modal/listing-modal.page';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';
import { LogicService } from 'src/app/logic.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

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
  }

  ionViewWillEnter() {
    this.getListings();
  }

  async filterModal() {
    const modal = await this.modalController.create({
      component: FilterModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        // console.log(data, 'yi');
        this.searchWithParameters(data.data);
      });

    return await modal.present();
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
        // console.log(data);
      });

    return await modal.present();
  }

  getListings() {
    const df = this.afs.collection('listings')
      .valueChanges().subscribe((data: any) => {
        // console.log(data);
        df.unsubscribe();
        this.listings = data;
      });
  }


  search(entry) {
    this.searchList = [];
    if (entry.target.value.length === 0) {
      this.getListings();
    }
    const dd = this.afs.collection('listings')
      .valueChanges().subscribe((data: any) => {
        dd.unsubscribe();
        // console.log(data);
        for (const x of data) {
          if (x.address.toLowerCase().includes(entry.target.value.toLowerCase())) {
            this.searchList.push(x);
          }
        }
        this.listings = this.searchList;
      });
  }

  searchWithParameters(dataa) {
    this.presentLoading();
    console.log(dataa);
    this.searchList = [];

    this.searchLocation(dataa.location);
    this.searchMinPrice(dataa.min_price);
    this.searchMaxPrice(dataa.max_price);
    this.searchPriceRate(dataa.price_rate);
    this.searchType(dataa.type);
    this.searchBedrooms(dataa.bedrooms);
    this.searchBathrooms(dataa.bathrooms);
    this.searchFurnished(dataa.furnished);
    this.searchStatus(dataa.status);

    setTimeout(() => {
      this.listings = this.searchList;
      this.loadingController.dismiss();
    }, 2000);
  }

  searchLocation(location) {
    const df = this.afs.collection(
      'listings', ref => ref
        .where('location', '==', location)
    )
      .valueChanges().subscribe((data: any) => {
        console.log(data);
        df.unsubscribe();
        for (const x of data) {
          const found = this.searchList.some(el => el.address === x.address);
          if (!found) {
            this.searchList.push(x);
          }
        }
      });
  }

  searchMinPrice(min) {
    const df = this.afs.collection(
      'listings', ref => ref
        .where('price', '>=', min)
    )
      .valueChanges().subscribe((data: any) => {
        console.log(data);
        df.unsubscribe();
        for (const x of data) {
          const found = this.searchList.some(el => el.address === x.address);
          if (!found) {
            this.searchList.push(x);
          }
        }
      });
  }

  searchMaxPrice(max) {
    const df = this.afs.collection(
      'listings', ref => ref
        .where('price', '<=', max)
    )
      .valueChanges().subscribe((data: any) => {
        console.log(data);
        df.unsubscribe();
        for (const x of data) {
          const found = this.searchList.some(el => el.address === x.address);
          if (!found) {
            this.searchList.push(x);
          }
        }
      });
  }

  searchPriceRate(rate) {
    const df = this.afs.collection(
      'listings', ref => ref
        .where('price_rate', '==', rate)
    )
      .valueChanges().subscribe((data: any) => {
        console.log(data);
        df.unsubscribe();
        for (const x of data) {
          const found = this.searchList.some(el => el.address === x.address);
          if (!found) {
            this.searchList.push(x);
          }
        }
      });
  }

  searchType(type) {
    const df = this.afs.collection(
      'listings', ref => ref
        .where('type', '==', type)
    )
      .valueChanges().subscribe((data: any) => {
        console.log(data);
        df.unsubscribe();
        for (const x of data) {
          const found = this.searchList.some(el => el.address === x.address);
          if (!found) {
            this.searchList.push(x);
          }
        }
      });
  }

  searchBedrooms(beds) {
    const df = this.afs.collection(
      'listings', ref => ref
        .where('bedrooms', '==', beds)
    )
      .valueChanges().subscribe((data: any) => {
        console.log(data);
        df.unsubscribe();
        for (const x of data) {
          const found = this.searchList.some(el => el.address === x.address);
          if (!found) {
            this.searchList.push(x);
          }
        }
      });
  }

  searchBathrooms(bath) {
    const df = this.afs.collection(
      'listings', ref => ref
        .where('bathrooms', '==', bath)
    )
      .valueChanges().subscribe((data: any) => {
        console.log(data);
        df.unsubscribe();
        for (const x of data) {
          const found = this.searchList.some(el => el.address === x.address);
          if (!found) {
            this.searchList.push(x);
          }
        }
      });
  }

  searchFurnished(fur) {
    const df = this.afs.collection(
      'listings', ref => ref
        .where('furnished', '==', fur)
    )
      .valueChanges().subscribe((data: any) => {
        console.log(data);
        df.unsubscribe();
        for (const x of data) {
          const found = this.searchList.some(el => el.address === x.address);
          if (!found) {
            this.searchList.push(x);
          }
        }
      });
  }

  searchStatus(status) {
    const df = this.afs.collection(
      'listings', ref => ref
        .where('status', '==', status)
    )
      .valueChanges().subscribe((data: any) => {
        console.log(data);
        df.unsubscribe();
        for (const x of data) {
          const found = this.searchList.some(el => el.address === x.address);
          if (!found) {
            this.searchList.push(x);
          }
        }
      });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please Wait...',
    });
    await loading.present();
  }

}
