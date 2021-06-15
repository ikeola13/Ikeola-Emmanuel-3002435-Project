import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LogicService } from 'src/app/logic.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.page.html',
  styleUrls: ['./edit-listing.page.scss'],
})
export class EditListingPage implements OnInit {

  @Input() id: number;
  public listingForm: FormGroup;
  finalData: any;
  images = [];
  imageUrls = [];
  docId;

  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    private angularFireStorage: AngularFireStorage,
    public loadingController: LoadingController,
    private logicService: LogicService,

    public toastController: ToastController,
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
    console.log(this.logicService.listingID);
  }

  ngOnInit() {
    this.getListings();
  }

  back() {
    this.modalController.dismiss();
  }

  addListing() {
    this.presentLoading();
    console.log(this.listingForm.value);

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

    console.log(data, this.docId);


    this.afs.collection('listings').doc(this.docId).update(data)
      .then((dat: any) => {
        console.log(dat);
        this.loadingController.dismiss();
        this.presentToast('Listing Successfully Updated!');
        this.getListings();
      }), catchError(error => {
        return this.presentToast(error.message);
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

  remove(url) {
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

  getListings() {
    this.afs.collection('listings', ref => ref.where('agent_id', '==', localStorage.getItem('uid')))
      .valueChanges().subscribe((data: any) => {
        console.log(data[this.logicService.listingID]);
        this.listingForm.controls.address.setValue(data[this.logicService.listingID].address);
        this.listingForm.controls.location.setValue(data[this.logicService.listingID].location);
        this.listingForm.controls.price.setValue(data[this.logicService.listingID].price);
        this.listingForm.controls.price_rate.setValue(data[this.logicService.listingID].price_rate);
        this.listingForm.controls.type.setValue(data[this.logicService.listingID].type);
        this.listingForm.controls.bedrooms.setValue(data[this.logicService.listingID].bedrooms);
        this.listingForm.controls.bathrooms.setValue(data[this.logicService.listingID].bathrooms);
        this.listingForm.controls.furnished.setValue(data[this.logicService.listingID].furnished);
        this.listingForm.controls.status.setValue(data[this.logicService.listingID].status);
        this.listingForm.controls.lease.setValue(data[this.logicService.listingID].lease);
        this.listingForm.controls.description.setValue(data[this.logicService.listingID].description);
        this.listingForm.controls.property_facilities.setValue(data[this.logicService.listingID].property_facilities);
        this.listingForm.controls.available_from.setValue(data[this.logicService.listingID].available_from);
        this.images = data[this.logicService.listingID].pictures;
        for (const x of data[this.logicService.listingID].pictures) {
          this.imageUrls.push(x.url);
        }
      });

    console.log(this.images);
    console.log(this.imageUrls);

    const docRef = this.afs.collection('listings');
    docRef.get()
      .subscribe((data: any) => {
      });
    docRef.snapshotChanges().forEach((changes) => {
      console.log(changes[this.logicService.listingID].payload.doc.id);
      this.docId = changes[this.logicService.listingID].payload.doc.id;
      // changes.map((a) => {
      //   this.docId = a.payload.doc.id;
      // });
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      position: 'bottom',
      duration: 5000,
    });
    toast.present();
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
