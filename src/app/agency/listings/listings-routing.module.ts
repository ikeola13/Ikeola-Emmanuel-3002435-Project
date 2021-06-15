import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListingsPage } from './listings.page';

const routes: Routes = [
  {
    path: '',
    component: ListingsPage
  },
  {
    path: 'add-listing',
    loadChildren: () => import('./add-listing/add-listing.module').then( m => m.AddListingPageModule)
  },
  {
    path: 'edit-listing',
    loadChildren: () => import('./edit-listing/edit-listing.module').then( m => m.EditListingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingsPageRoutingModule {}
