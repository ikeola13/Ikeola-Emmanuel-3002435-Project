import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalModalPageRoutingModule } from './personal-modal-routing.module';

import { PersonalModalPage } from './personal-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalModalPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [PersonalModalPage]
})
export class PersonalModalPageModule {}
