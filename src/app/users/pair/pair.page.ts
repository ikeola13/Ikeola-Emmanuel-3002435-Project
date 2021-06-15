import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AddPairingPage } from './add-pairing/add-pairing.page';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { LogicService } from 'src/app/logic.service';
import { catchError } from 'rxjs/operators';
import { ViewPairPage } from './view-pair/view-pair.page';

@Component({
  selector: 'app-pair',
  templateUrl: './pair.page.html',
  styleUrls: ['./pair.page.scss'],
})
export class PairPage implements OnInit {
  name;
  pairs = [] as any;
  joinPair;
  addPair;
  allPresentUsers = [] as any;
  docId;
  pairData;

  constructor(
    public alertController: AlertController,
    public modalController: ModalController,
    public afs: AngularFirestore,
    public loadingController: LoadingController,
    private logicService: LogicService,
  ) { }

  ngOnInit() {
    this.getUserData();
    this.getPairs();
    this.checkAdd();
    this.allPairs();
  }
  async join() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Pairing',
      subHeader: 'Apple',
      message: 'Are you sure you want to join this pairing?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async addPairingModal() {
    const modal = await this.modalController.create({
      component: AddPairingPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
      });

    return await modal.present();
  }

  async newPair() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Create New Pairing',
      inputs: [
        {
          name: 'pairing_name',
          type: 'text',
          placeholder: 'Pairing Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.presentLoading();
            const dt = {
              pairing_name: data.pairing_name,
              created_by: localStorage.getItem('uid'),
              users: [{
                uid: localStorage.getItem('uid'),
                name: this.name,
              }]
            };
            console.log(dt);
            this.afs
              .collection('pairings')
              .add(dt)
              .then(res => {
                console.log(res);
                this.loadingController.dismiss();
                this.logicService.presentToast('Pairing Successfully added!');
              });
          }
        }
      ]
    });

    await alert.present();
  }

  getUserData() {
    this.afs.collection('users', ref => ref.where('uid', '==', localStorage.getItem('uid')))
      .valueChanges().subscribe((data: any) => {
        this.name = data[0].lastname + ' ' + data[0].firstname;
      });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
  }

  getPairs() {
    this.afs.collection('pairings')
      .valueChanges().subscribe((data: any) => {
        this.pairs = data;
      });
  }

  checkJoin(uid) {
    const uids = [];
    this.afs.collection('pairings', ref => ref.where('created_by', '==', localStorage.getItem('uid')))
      .valueChanges().subscribe((data: any) => {
        console.log(data);
      });
  }

  checkAdd() {
    this.afs.collection('pairings', ref => ref.where('created_by', '==', localStorage.getItem('uid')))
      .valueChanges().subscribe((data: any) => {
        if (data.length > 0) {
          this.addPair = false;
        } else {
          this.addPair = true;
        }
      });
  }

  allPairs() {
    this.afs.collection('pairings')
      .valueChanges().subscribe((data: any) => {
        console.log(data);
        for (const df of data) {
          console.log(df);
          for (const sf of df.users) {
            console.log(sf);
            this.allPresentUsers.push(sf);
          }
        }
        console.log(this.allPresentUsers);
        console.log(this.allPresentUsers.some(code => code.uid === localStorage.getItem('uid')));
        if (this.allPresentUsers.some(code => code.uid === localStorage.getItem('uid')) === true) {
          this.joinPair = false;
        } else {
          this.joinPair = true;
        }
      });
  }

  async displayPair(dat) {
    this.afs.collection('users', ref => ref.where('uid', '==', dat))
      .valueChanges().subscribe((data: any) => {
        console.log(dat, data[0]);
        this.logicService.userPairDetails = data[0];
        this.openPair();
      });

  }

  async openPair() {
    const modal = await this.modalController.create({
      component: ViewPairPage,
      cssClass: 'my-custom-class',
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
      });

    return await modal.present();
  }

  async presentAlert(username, picture, occupation, interests) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: picture,
      subHeader: username,
      message: interests + ' </br> ' + occupation,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  joinExistingPair(index, createdBy, pairingName, userss) {

    userss.push(
      {
        uid: localStorage.getItem('uid'),
        name: this.name,
      }
    );

    console.log(index, createdBy, pairingName, userss);


    const docRef = this.afs.collection('pairings');
    docRef.get()
      .subscribe((data: any) => {
      });
    docRef.snapshotChanges().forEach((changes) => {
      console.log(changes[index].payload.doc.id);
      this.logicService.pairingID = changes[index].payload.doc.id;
    });

    const dll = {
      created_by: createdBy,
      pairing_name: pairingName,
      users: userss
    };

    console.log(dll);


    console.log(localStorage.getItem('uid'));

    setTimeout(() => {
      this.afs.collection('pairings').doc(this.logicService.pairingID).update(dll)
        .then((data: any) => {
          console.log(data);
          this.logicService.presentToast('pairing Successfully joined!');
          this.ngOnInit();
        }), catchError(error => {
          return this.logicService.presentToast(error.message);
        });
    }, 5000);

  }

}
