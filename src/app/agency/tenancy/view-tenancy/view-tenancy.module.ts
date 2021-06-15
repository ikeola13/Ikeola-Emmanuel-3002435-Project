import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewTenancyPageRoutingModule } from './view-tenancy-routing.module';

import { ViewTenancyPage } from './view-tenancy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewTenancyPageRoutingModule
  ],
  declarations: [ViewTenancyPage]
})
export class ViewTenancyPageModule {}
