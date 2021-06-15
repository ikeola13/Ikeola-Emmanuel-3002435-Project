import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';
import { LogicService } from 'src/app/logic.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tenancy-modal',
  templateUrl: './tenancy-modal.page.html',
  styleUrls: ['./tenancy-modal.page.scss'],
})
export class TenancyModalPage implements OnInit {
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
  ) {
    this.links = 'current';
  }

  ngOnInit() {
    this.getTenancy();
    this.checkDate();
  }

  getTenancy() {
    const dt = this.afs.collection('tenancy')
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

  back() {
    this.modalController.dismiss();
  }

}
