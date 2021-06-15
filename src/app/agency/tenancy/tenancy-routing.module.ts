import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TenancyPage } from './tenancy.page';

const routes: Routes = [
  {
    path: '',
    component: TenancyPage
  },
  {
    path: 'add-tenancy',
    loadChildren: () => import('./add-tenancy/add-tenancy.module').then( m => m.AddTenancyPageModule)
  },
  {
    path: 'view-tenancy',
    loadChildren: () => import('./view-tenancy/view-tenancy.module').then( m => m.ViewTenancyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenancyPageRoutingModule {}
