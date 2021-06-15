import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersModalPageRoutingModule } from './users-modal-routing.module';

import { UsersModalPage } from './users-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersModalPageRoutingModule
  ],
  declarations: [UsersModalPage]
})
export class UsersModalPageModule {}
