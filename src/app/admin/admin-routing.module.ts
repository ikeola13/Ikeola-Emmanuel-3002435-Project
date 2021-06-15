import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  {
    path: 'users-modal',
    loadChildren: () => import('./users-modal/users-modal.module').then( m => m.UsersModalPageModule)
  },
  {
    path: 'listings-modal',
    loadChildren: () => import('./listings-modal/listings-modal.module').then( m => m.ListingsModalPageModule)
  },
  {
    path: 'tenancy-modal',
    loadChildren: () => import('./tenancy-modal/tenancy-modal.module').then( m => m.TenancyModalPageModule)
  },
  {
    path: 'agents-modal',
    loadChildren: () => import('./agents-modal/agents-modal.module').then( m => m.AgentsModalPageModule)
  },
  {
    path: 'pairings-modal',
    loadChildren: () => import('./pairings-modal/pairings-modal.module').then( m => m.PairingsModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
