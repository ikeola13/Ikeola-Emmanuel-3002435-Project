import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TenancyModalPage } from './tenancy-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TenancyModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenancyModalPageRoutingModule {}
