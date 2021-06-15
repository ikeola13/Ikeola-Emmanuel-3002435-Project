import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingsModalPageRoutingModule } from './listings-modal-routing.module';

import { ListingsModalPage } from './listings-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingsModalPageRoutingModule
  ],
  declarations: [ListingsModalPage]
})
export class ListingsModalPageModule {}
