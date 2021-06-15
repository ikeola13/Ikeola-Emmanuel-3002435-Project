import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PairingsModalPageRoutingModule } from './pairings-modal-routing.module';

import { PairingsModalPage } from './pairings-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PairingsModalPageRoutingModule
  ],
  declarations: [PairingsModalPage]
})
export class PairingsModalPageModule {}
