import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListingModalPage } from './listing-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ListingModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingModalPageRoutingModule {}
