import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';
import { map, catchError } from 'rxjs/operators';
import { LogicService } from '../../../logic.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-personal-modal',
  templateUrl: './personal-modal.page.html',
  styleUrls: ['./personal-modal.page.scss'],
})
export class PersonalModalPage implements OnInit {

  docId;
  public updateForm: FormGroup;
  profilePicture;

  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public toastController: ToastController,
    private logicService: LogicService,
    public loadingController: LoadingController,
  ) {
    this.updateForm = this.formBuilder.group({
      email: [{ value: '', disabled: true }, Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      interests: ['', Validators.required],
      occupation: ['', Validators.required],
      company_name: ['', Validators.required],
      license_number: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getData();
    this.getUserData();
    this.profilePicture = localStorage.getItem('profile_picture');
  }

  async update() {
    console.log(this.updateForm.value);
    this.updateToUserTable();


  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      position: 'bottom',
      duration: 5000,
    });
    toast.present();
  }

  back() {
    this.modalController.dismiss();
  }

  updateToUserTable() {
    this.presentLoading();
    console.log(this.docId);
    this.afs.collection('users').doc(this.docId).update({
      firstname: this.updateForm.value.firstname,
      lastname: this.updateForm.value.lastname,
      phoneNumber: this.updateForm.value.phoneNumber,
      dateOfBirth: this.updateForm.value.dateOfBirth,
      interests: this.updateForm.value.interests,
      company_name: this.updateForm.value.company_name,
      license_number: this.updateForm.value.license_number,
      occupation: this.updateForm.value.occupation,
    })
      .then((data: any) => {
        console.log(data);
        this.loadingController.dismiss().then((res) => {
          console.log('Loading dismissed!', res);
          this.presentToast('User Profile Successfully Updated!');
          this.getData();
        }).catch((error) => {
          console.log('error', error);
        });
      }), catchError(error => {
        return this.presentToast(error.message);
      });
  }

  getData() {
    this.afs.collection('users', ref => ref.where('uid', '==', localStorage.getItem('uid')))
      .valueChanges().subscribe((data: any) => {
        this.profilePicture = data[0].profile_picture;
        console.log(data);
        this.updateForm.controls.email.setValue(data[0].email);
        this.updateForm.controls.firstname.setValue(data[0].firstname);
        this.updateForm.controls.lastname.setValue(data[0].lastname);
        this.updateForm.controls.phoneNumber.setValue(data[0].phoneNumber);
        this.updateForm.controls.dateOfBirth.setValue(data[0].dateOfBirth);
        this.updateForm.controls.interests.setValue(data[0].interests);
        this.updateForm.controls.company_name.setValue(data[0].company_name);
        this.updateForm.controls.license_number.setValue(data[0].license_number);
        this.updateForm.controls.occupation.setValue(data[0].occupation);
      });

    const docRef = this.afs.collection('users', ref => ref.where('uid', '==', localStorage.getItem('uid')));
    docRef.get()
      .subscribe((data: any) => {
      });
    docRef.snapshotChanges().forEach((changes) => {
      changes.map((a) => {
        this.docId = a.payload.doc.id;
      });
    });

  }

  upload(file) {
    this.presentLoading();
    this.logicService.storeImage(file[0].name, file[0]).then(
      (resp: any) => {
        if (resp) {
          console.log(resp);
          this.afs.collection('users').doc(this.docId).update({
            profile_picture: resp,
          })
            .then((data: any) => {
              console.log(data);
              this.loadingController.dismiss().then((res) => {
                console.log('Loading dismissed!', res);
              }).catch((error) => {
                console.log('error', error);
              });
              this.ngOnInit();
              this.presentToast('Profile Picture Successfully Updated!');
            }), catchError(error => {
              return this.presentToast(error.message);
            });
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getUserData() {
    this.afs.collection('users', ref => ref.where('uid', '==', localStorage.getItem('uid')))
      .valueChanges().subscribe((data: any) => {
        console.log(data[0]);
        localStorage.setItem('profile_picture', data[0].profile_picture);
      });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Uploading Image...',
    });
    await loading.present();
  }


}
