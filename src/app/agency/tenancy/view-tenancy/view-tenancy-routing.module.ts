import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewTenancyPage } from './view-tenancy.page';

const routes: Routes = [
  {
    path: '',
    component: ViewTenancyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewTenancyPageRoutingModule {}
