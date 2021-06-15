import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgencyPage } from './agency.page';

const routes: Routes = [
  {
    path: '',
    component: AgencyPage,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'listings',
        loadChildren: () => import('./listings/listings.module').then( m => m.ListingsPageModule)
      },
      {
        path: 'tenancy',
        loadChildren: () => import('./tenancy/tenancy.module').then( m => m.TenancyPageModule)
      },
      {
        path: '',
        redirectTo: '/agency/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/agency/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgencyPageRoutingModule {}
