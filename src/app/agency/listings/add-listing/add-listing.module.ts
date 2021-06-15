import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddListingPageRoutingModule } from './add-listing-routing.module';

import { AddListingPage } from './add-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddListingPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddListingPage]
})
export class AddListingPageModule {}
