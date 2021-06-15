import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingModalPageRoutingModule } from './listing-modal-routing.module';

import { ListingModalPage } from './listing-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingModalPageRoutingModule
  ],
  declarations: [ListingModalPage],
})
export class ListingModalPageModule {}
