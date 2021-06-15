import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TenancyModalPageRoutingModule } from './tenancy-modal-routing.module';

import { TenancyModalPage } from './tenancy-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TenancyModalPageRoutingModule
  ],
  declarations: [TenancyModalPage]
})
export class TenancyModalPageModule {}
