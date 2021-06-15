import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgentsModalPageRoutingModule } from './agents-modal-routing.module';

import { AgentsModalPage } from './agents-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgentsModalPageRoutingModule
  ],
  declarations: [AgentsModalPage]
})
export class AgentsModalPageModule {}
