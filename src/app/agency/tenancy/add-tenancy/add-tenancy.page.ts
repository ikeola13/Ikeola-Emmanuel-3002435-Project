import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';
import { LogicService } from 'src/app/logic.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-tenancy',
  templateUrl: './add-tenancy.page.html',
  styleUrls: ['./add-tenancy.page.scss'],
})
export class AddTenancyPage implements OnInit {
  public tenancyForm: FormGroup;
  users = [] as any;
  listings = [] as any;
  listId;
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
    this.tenancyForm = this.formBuilder.group({
      user_pic: ['', Validators.required],
      username: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required],
      address: ['', Validators.required],
      price_rate: ['', Validators.required],
      lease: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      list_id: ['', Validators.required],
      user_id: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.getListing();
    this.getUserData();
  }

  back() {
    this.modalController.dismiss();
  }

  addTenancy() {
    this.presentLoading();
    console.log(this.tenancyForm.value);

    const data = {
      user_pic: this.tenancyForm.value.user_pic,
      username: this.tenancyForm.value.username,
      location: this.tenancyForm.value.location,
      price: this.tenancyForm.value.price,
      address: this.tenancyForm.value.address,
      price_rate: this.tenancyForm.value.price_rate,
      lease: this.tenancyForm.value.lease,
      start_date: this.tenancyForm.value.start_date,
      end_date: this.tenancyForm.value.end_date,
      list_id: this.tenancyForm.value.list_id,
      agent_id: localStorage.getItem('uid'),
      user_id: this.tenancyForm.value.user_id,
      files: this.images
    };

    console.log(data);
    this.afs
      .collection('tenancy')
      .add(data)
      .then(res => {
        console.log(res);
        this.loadingController.dismiss();
        this.logicService.presentToast('Tenancy Successfully added!');
        this.back();
      });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Uploading Image...',
    });
    await loading.present();
  }

  user(entry) {
    console.log(entry);
    this.afs.collection('users', ref => ref.where('uid', '==', entry.target.value))
      .valueChanges().subscribe((data: any) => {
        console.log(data);
        this.tenancyForm.controls.user_pic.setValue(data[0].profile_picture);
        this.tenancyForm.controls.username.setValue(data[0].lastname + ' ' + data[0].firstname);
        this.tenancyForm.controls.user_id.setValue(data[0].uid);
      });
  }

  list(datl) {
    const dat = datl.target.value;
    console.log(dat);
    const docRef = this.afs.collection('listings');
    docRef.get()
      .subscribe((data: any) => {
      });
    docRef.snapshotChanges().forEach((changes) => {
      console.log(changes[dat].payload.doc.id);
      this.tenancyForm.controls.list_id.setValue(changes[dat].payload.doc.id);
    });

    this.afs.collection('listings')
    .valueChanges().subscribe((data: any) => {
      console.log(data);
      this.tenancyForm.controls.location.setValue(data[dat].location);
      this.tenancyForm.controls.price.setValue(data[dat].price);
      this.tenancyForm.controls.address.setValue(data[dat].address);
      this.tenancyForm.controls.price_rate.setValue(data[dat].price_rate);
      this.tenancyForm.controls.lease.setValue(data[dat].lease);
    });
  }

  getUserData() {
    this.afs.collection('users')
      .valueChanges().subscribe((data: any) => {
        console.log(data);
        this.users = data;
      });
  }

  getListing() {
    this.afs.collection('listings')
      .valueChanges().subscribe((data: any) => {
        console.log(data);
        this.listings = data;
      });
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

  remove(url, i) {
    this.deleteFromFirebase(url);

    this.arrayRemove(this.imageUrls, url);
    this.arrayRemove2(this.images, url);
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
