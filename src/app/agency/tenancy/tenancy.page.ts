import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddTenancyPage } from './add-tenancy/add-tenancy.page';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';
import { LogicService } from 'src/app/logic.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';

@Component({
  selector: 'app-tenancy',
  templateUrl: './tenancy.page.html',
  styleUrls: ['./tenancy.page.scss'],
})
export class TenancyPage implements OnInit {
  tenancyList = [] as any;
  currentTenancy = [] as any;
  expiredTenancy = [] as any;
  expiredTab = false;
  links;


  constructor(
    public modalController: ModalController,
    private angularFireStorage: AngularFireStorage,
    public loadingController: LoadingController,
    private logicService: LogicService,
    public afs: AngularFirestore,
    private downloader: Downloader
  ) {
    this.links = 'current';
  }

  ngOnInit() {
    this.getTenancy();
    this.checkDate();
  }

  async addTenancyModal() {
    const modal = await this.modalController.create({
      component: AddTenancyPage,
      cssClass: 'my-custom-class',
      componentProps: {
        // id,
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
      });

    return await modal.present();
  }

  getTenancy() {
    const dt = this.afs.collection('tenancy', ref => ref.where('agent_id', '==', localStorage.getItem('uid')))
      .valueChanges().subscribe((data: any) => {
        dt.unsubscribe();
        console.log(data);
        this.tenancyList = data;
        for (const x of data) {
          if (this.checkDate(x.end_date)) {
            this.currentTenancy.push(x);
          } else {
            this.expiredTenancy.push(x);
          }
        }
      });
  }

  checkDate(ent?) {
    let GivenDate = ent;
    const today = new Date();
    GivenDate = new Date(GivenDate);

    console.log(ent);
    console.log(today);

    if (GivenDate > today) {
      console.log('Given date is greater than the current date.');
      return true;
    } else {
      return false;
    }
  }

  segmentChanged(ev: any) {
    console.log(ev.detail.value);
    if (ev.detail.value === 'expired') {
      this.expiredTab = true;
    } else {
      this.expiredTab = false;
    }
  }

  download(url, name) {
    console.log(url);

    const request: DownloadRequest = {
      uri: url,
      title: name,
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
        dirType: 'Downloads',
        subPath: 'MyFile.apk'
      }
    };


    this.downloader.download(request)
      .then((location: string) => console.log('File downloaded at:' + location))
      .catch((error: any) => console.error(error));
  }

}
