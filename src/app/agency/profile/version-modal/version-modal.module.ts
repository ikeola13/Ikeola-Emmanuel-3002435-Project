import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VersionModalPageRoutingModule } from './version-modal-routing.module';

import { VersionModalPage } from './version-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VersionModalPageRoutingModule
  ],
  declarations: [VersionModalPage]
})
export class VersionModalPageModule {}
