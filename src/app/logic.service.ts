import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  listingID;
  addressURL;
  pairingID;
  userPairDetails;

  constructor(
    private angularFireStorage: AngularFireStorage,
    public toastController: ToastController,
    ) { }

  async storeImage(imageName, imageData: any) {
    try {
      return new Promise((resolve, reject) => {
        const pictureRef = this.angularFireStorage.ref('images/' + imageName);
        pictureRef
          .put(imageData)
          .then(() => {
            pictureRef.getDownloadURL().subscribe((url: any) => {
              resolve(url);
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (e) { }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      position: 'bottom',
      duration: 5000,
    });
    toast.present();
  }
}
