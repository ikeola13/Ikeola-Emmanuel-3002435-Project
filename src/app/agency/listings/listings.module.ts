import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingsPageRoutingModule } from './listings-routing.module';

import { ListingsPage } from './listings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ListingsPage]
})
export class ListingsPageModule {}
