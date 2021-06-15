import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TenancyPageRoutingModule } from './tenancy-routing.module';

import { TenancyPage } from './tenancy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TenancyPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TenancyPage]
})
export class TenancyPageModule {}
