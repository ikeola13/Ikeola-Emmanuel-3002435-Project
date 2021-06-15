import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPairingPageRoutingModule } from './add-pairing-routing.module';

import { AddPairingPage } from './add-pairing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPairingPageRoutingModule
  ],
  declarations: [AddPairingPage]
})
export class AddPairingPageModule {}
