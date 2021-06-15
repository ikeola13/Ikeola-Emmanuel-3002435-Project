import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListingsModalPage } from './listings-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ListingsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingsModalPageRoutingModule {}
