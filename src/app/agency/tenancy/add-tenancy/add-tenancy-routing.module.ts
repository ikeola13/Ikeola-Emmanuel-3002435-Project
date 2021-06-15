import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTenancyPage } from './add-tenancy.page';

const routes: Routes = [
  {
    path: '',
    component: AddTenancyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTenancyPageRoutingModule {}
