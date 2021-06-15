import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPairPageRoutingModule } from './view-pair-routing.module';

import { ViewPairPage } from './view-pair.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPairPageRoutingModule
  ],
  declarations: [ViewPairPage]
})
export class ViewPairPageModule {}
