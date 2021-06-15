import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PersonalModalPage } from './personal-modal/personal-modal.page';
import { MessagesModalPage } from './messages-modal/messages-modal.page';
import { LogicService } from '../../logic.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profilePicture;

  constructor(
    public alertController: AlertController,
    public modalController: ModalController,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public logicService: LogicService,
    private router: Router) { }

  ngOnInit() {
    console.log(localStorage.getItem('profile_picture'));
    this.profilePicture = localStorage.getItem('profile_picture');
  }

  async version() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Version',
      message: 'Version 1.0',
      buttons: ['OK']
    });

    await alert.present();
  }

  async about() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'About',
      message: 'This is the Agent Interface of the app.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async editProfileModal() {
    const modal = await this.modalController.create({
      component: PersonalModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
      });

    return await modal.present();
  }

  async messages() {
    const modal = await this.modalController.create({
      component: MessagesModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
      });

    return await modal.present();
  }

  async logout() {
    try {
      const res = await this.afAuth.signOut()
        .then(resp => {
          console.log(resp);
          this.logicService.presentToast('Successfully logged out!');
          window.localStorage.clear();
          console.log(localStorage);
          this.router.navigate(['/auth']);
        });
    } catch (error) {
      console.log(error);
      this.logicService.presentToast(error.message);
    }
  }

}
