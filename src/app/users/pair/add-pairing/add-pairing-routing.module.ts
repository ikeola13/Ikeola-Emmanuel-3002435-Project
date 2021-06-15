import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPairingPage } from './add-pairing.page';

const routes: Routes = [
  {
    path: '',
    component: AddPairingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPairingPageRoutingModule {}
