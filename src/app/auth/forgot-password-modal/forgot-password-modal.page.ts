import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.page.html',
  styleUrls: ['./forgot-password-modal.page.scss'],
})
export class ForgotPasswordModalPage implements OnInit {

  constructor(public modalController: ModalController,
              public toastController: ToastController,
              public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      position: 'bottom',
      duration: 5000,
    });
    toast.present();
  }

  async reset(email: any) {
    try {
      const res = await this.afAuth.sendPasswordResetEmail(email.value)
        .then(resp => {
          console.log(resp);
          // this.modalController.dismiss();
          this.presentToast('Password reset link has been sent to your email!');
        });
    } catch (error) {
      console.log(error);
      this.presentToast(error.message);
    }
  }

  back() {
    this.modalController.dismiss();
  }

}
