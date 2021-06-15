import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PairPage } from './pair.page';

const routes: Routes = [
  {
    path: '',
    component: PairPage
  },
  {
    path: 'add-pairing',
    loadChildren: () => import('./add-pairing/add-pairing.module').then( m => m.AddPairingPageModule)
  },
  {
    path: 'view-pair',
    loadChildren: () => import('./view-pair/view-pair.module').then( m => m.ViewPairPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PairPageRoutingModule {}
