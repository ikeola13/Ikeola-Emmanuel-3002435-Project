import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PairingsModalPage } from './pairings-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PairingsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PairingsModalPageRoutingModule {}
