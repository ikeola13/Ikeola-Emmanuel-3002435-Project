import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTenancyPageRoutingModule } from './add-tenancy-routing.module';

import { AddTenancyPage } from './add-tenancy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTenancyPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddTenancyPage]
})
export class AddTenancyPageModule {}
