import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { LogicService } from 'src/app/logic.service';

@Component({
  selector: 'app-view-pair',
  templateUrl: './view-pair.page.html',
  styleUrls: ['./view-pair.page.scss'],
})
export class ViewPairPage implements OnInit {
  @Input() data: any;
  dat = [] as any;

  constructor(
    public modalController: ModalController,
    private logicService: LogicService,
    ) { }

  ngOnInit() {
    console.log(this.logicService.userPairDetails);
    this.dat = this.logicService.userPairDetails;
  }

  back() {
    this.modalController.dismiss();
  }

}
