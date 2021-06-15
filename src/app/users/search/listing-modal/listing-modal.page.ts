import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';
import { LogicService } from 'src/app/logic.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, catchError } from 'rxjs/operators';
import { ActionSheetController } from '@ionic/angular';
import { EditListingPage } from 'src/app/agency/listings/edit-listing/edit-listing.page';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

@Component({
  selector: 'app-listing-modal',
  templateUrl: './listing-modal.page.html',
  styleUrls: ['./listing-modal.page.scss'],
})
export class ListingModalPage implements OnInit {
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  @Input() id: number;
  @Input() url: string;

  listingData = {} as any;
  agentData = {} as any;
  monthString;
  month;
  userType;
  docId;
  paired;
  users;

  sliderOne: any;

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  CopyInputText = 'Hello World!';
  PasteText = 'Paste Text!';


  constructor(
    public modalController: ModalController,
    private angularFireStorage: AngularFireStorage,
    public loadingController: LoadingController,
    private logicService: LogicService,
    public afs: AngularFirestore,
    public alertController: AlertController,
    public toastController: ToastController,
    private actionSheet: ActionSheetController,
    private clipboard: Clipboard,
    private emailComposer: EmailComposer,
    private launchNavigator: LaunchNavigator,
    public actionSheetController: ActionSheetController
  ) {
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 995,
          url: 'assets/images/house.jpg'
        },
        {
          id: 925,
          url: 'assets/images/house2.jpg'
        },
      ]
    };
  }

  ngOnInit() {
    console.log(this.id, this.url);
    // console.log(this.addressURL);
    this.userType = localStorage.getItem('user_type');
    console.log(this.userType);
    this.logicService.listingID = this.id;
    this.logicService.addressURL = this.url;

    if (this.userType === 'agent') {
      this.getListing(this.url);
    } else if (this.userType === 'user') {
      this.getListingUser(this.url);
    }
  }

  back() {
    this.modalController.dismiss();
  }

  // Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(2000).then(() => {
      // this.checkIfNavDisabled(object, slideView);
    });
  }

  // Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(2000).then(() => {
      // this.checkIfNavDisabled(object, slideView);
    });
  }

  SlideDidChange(object, slideView) {
    // this.checkIfNavDisabled(object, slideView);
  }

  getListing(url) {
    console.log(this.logicService.addressURL);
    this.afs.collection('listings',
      ref => ref.where('agent_id', '==', localStorage.getItem('uid')).where('address', '==', url))
      .valueChanges().subscribe((data: any) => {
        this.listingData = data[0];

        this.sliderOne.slidesItems = this.listingData.pictures;
        console.log(this.listingData);
        this.getAgent();
        this.monthString = this.listingData.available_from[5] + this.listingData.available_from[6];
        console.log(this.monthString);
        this.getMonth();
      });
  }

  getListingUser(url) {
    console.log(this.logicService.addressURL);
    this.afs.collection('listings', ref => ref.where('address', '==', url))
      .valueChanges().subscribe((data: any) => {
        this.listingData = data[0];

        this.sliderOne.slidesItems = this.listingData.pictures;
        console.log(this.listingData);
        this.getAgent();
        this.monthString = this.listingData.available_from[5] + this.listingData.available_from[6];
        console.log(this.monthString);
        this.getMonth();
      });
  }

  getAgent() {
    this.afs.collection('users', ref => ref.where('uid', '==', this.listingData.agent_id))
      .valueChanges().subscribe((data: any) => {
        this.agentData = data[0];
        console.log(data);
      });
  }

  getMonth() {
    switch (this.monthString) {
      case '01':
        this.month = 'January';
        break;
      case '02':
        this.month = 'February';
        break;
      case '03':
        this.month = 'March';
        break;
      case '04':
        this.month = 'April';
        break;
      case '05':
        this.month = 'May';
        break;
      case '06':
        this.month = 'June';
        break;
      case '07':
        this.month = 'July';
        break;
      case '08':
        this.month = 'August';
        break;
      case '09':
        this.month = 'September';
        break;
      case '10':
        this.month = 'October';
        break;
      case '11':
        this.month = 'November';
        break;
      case '12':
        this.month = 'December';
        break;
    }
  }

  // private get isEmailClientConfigured(): Promise<boolean> {
  //   return this.emailComposer.isAvailable();
  // }

  sendMail() {
    console.log('hi');
    const email = {
      to: 'ikeoladarey@gmail.com',
      // cc: 'max@mustermann.de',
      // attachments: [
      //   this.currentImage
      // ],
      subject: 'My Cool Image',
      body: 'Hey Simon, what do you thing about this image?',
      isHtml: true
    };
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      position: 'bottom',
      duration: 5000,
    });
    toast.present();
  }

  openActionSheet() {
    this.actionSheet.create({
      header: 'Share this listing with others',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Copy Listing Address',
          icon: 'copy',
          handler: () => {
            this.copyString();
            console.log('Share clicked');
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  async editListing() {
    const modal = await this.modalController.create({
      component: EditListingPage,
      cssClass: 'my-custom-class',
      componentProps: {
        id: this.id,
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
      });

    return await modal.present();
  }

  // Copy
  copyString() {
    this.clipboard.copy(this.listingData.address);
  }

  // Paste
  pasteText() {
    this.clipboard.paste().then(
      (resolve: string) => {
        this.PasteText = resolve;
        console.log(resolve);
      },
      (reject: string) => {
        console.error('Error: ' + reject);
      }
    );
  }

  // Clear
  clearText() {
    this.clipboard.clear();
  }

  async email(agentEmail) {
    console.log(agentEmail);
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose how you want to Apply.',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Message Agent',
        icon: 'person',
        handler: () => {
          this.openEmailComposer();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  openEmailComposer() {
    this.emailComposer.open({
      to: this.agentData.email,
      subject: 'Interested in apartment => ' + this.listingData.address,
      body: 'Hi I am a registered member on the mobile app and I am interested in this apartment',
    });
  }

openMap() {

  this.launchNavigator.navigate(this.listingData.address)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
}

getPairs() {
  const fg = [];
  this.afs.collection('pairings')
    .valueChanges().subscribe((data: any) => {
      console.log(data);
      for (const df of data) {
        for (const d of df.users) {
          if (d.uid === localStorage.getItem('uid')) {
            fg.push(d.name);
            this.users = fg.toString();
          }
        }
      }
    });
}

}
