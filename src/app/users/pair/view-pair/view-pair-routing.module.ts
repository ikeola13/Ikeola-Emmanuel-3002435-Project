import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPairPage } from './view-pair.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPairPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPairPageRoutingModule {}
