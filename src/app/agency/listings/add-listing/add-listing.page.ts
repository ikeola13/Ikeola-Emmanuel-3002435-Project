import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';
import { LogicService } from 'src/app/logic.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.page.html',
  styleUrls: ['./add-listing.page.scss'],
})
export class AddListingPage implements OnInit {

  public listingForm: FormGroup;
  finalData: any;
  images = [];
  imageUrls = [];

  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    private angularFireStorage: AngularFireStorage,
    public loadingController: LoadingController,
    private logicService: LogicService,
    public afs: AngularFirestore,
  ) {
    this.listingForm = this.formBuilder.group({
      address: ['', Validators.required],
      price: ['', Validators.required],
      price_rate: ['', Validators.required],
      type: ['', Validators.required],
      bedrooms: ['', Validators.required],
      bathrooms: ['', Validators.required],
      furnished: ['', Validators.required],
      lease: ['', Validators.required],
      description: ['', Validators.required],
      property_facilities: ['', Validators.required],
      available_from: ['', Validators.required],
      status: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  back() {
    this.modalController.dismiss();
  }

  addListing() {
    this.presentLoading();
    // console.log(this.listingForm.value);

    const data = {
      address: this.listingForm.value.address,
      price: this.listingForm.value.price,
      price_rate: this.listingForm.value.price_rate,
      type: this.listingForm.value.type,
      bedrooms: this.listingForm.value.bedrooms,
      bathrooms: this.listingForm.value.bathrooms,
      furnished: this.listingForm.value.furnished,
      lease: this.listingForm.value.lease,
      description: this.listingForm.value.description,
      property_facilities: this.listingForm.value.property_facilities,
      available_from: this.listingForm.value.available_from,
      status: this.listingForm.value.status,
      location: this.listingForm.value.location,
      agent_id: localStorage.getItem('uid'),
      agent_email: localStorage.getItem('email'),
      pictures: this.images,
    };


    console.log(data);

    this.afs
      .collection('listings')
      .add(data)
      .then(res => {
        console.log(res);
        this.loadingController.dismiss();
        this.logicService.presentToast('Listing Successfully added!');
        this.back();
      });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please Wait...',
    });
    await loading.present();
  }

  delete(url) {
    return this.angularFireStorage.storage.refFromURL(url).delete();
  }

  removeImage(url) {
    const index = this.images.indexOf(url);
    if (index > -1) {
      this.images.splice(index, 1);
    }
    return this.images;
  }

  remove(url, i) {
    this.deleteFromFirebase(url);

    this.arrayRemove(this.imageUrls, url);
    this.arrayRemove2(this.images, url);
  }

  upload(file) {
    this.presentLoading();
    this.logicService.storeImage(file[0].name, file[0]).then(
      (resp: any) => {
        if (resp) {
          const dat = {
            name: file[0].name,
            url: resp
          };

          this.images.push(dat);
          this.imageUrls.push(resp);

          this.loadingController.dismiss().then((res) => {
          }).catch((error) => {
          });
        }
      },
      (error: any) => {
      }
    );
  }

  arrayRemove(arr, value) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      }
    }
    console.log(arr);
  }

  arrayRemove2(arr, value) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].url === value) {
        arr.splice(i, 1);
      }
    }
    console.log(arr);
  }

  deleteFromFirebase(url) {
    return this.angularFireStorage.storage.refFromURL(url).delete();
  }


}
