import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedModalPageRoutingModule } from './saved-modal-routing.module';

import { SavedModalPage } from './saved-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedModalPageRoutingModule
  ],
  declarations: [SavedModalPage]
})
export class SavedModalPageModule {}
