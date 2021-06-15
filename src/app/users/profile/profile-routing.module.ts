import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'personal-modal',
    loadChildren: () => import('./personal-modal/personal-modal.module').then( m => m.PersonalModalPageModule)
  },
  {
    path: 'saved-modal',
    loadChildren: () => import('./saved-modal/saved-modal.module').then( m => m.SavedModalPageModule)
  },
  {
    path: 'messages-modal',
    loadChildren: () => import('./messages-modal/messages-modal.module').then( m => m.MessagesModalPageModule)
  },
  {
    path: 'tenancy-modal',
    loadChildren: () => import('./tenancy-modal/tenancy-modal.module').then( m => m.TenancyModalPageModule)
  },
  {
    path: 'about-modal',
    loadChildren: () => import('./about-modal/about-modal.module').then( m => m.AboutModalPageModule)
  },
  {
    path: 'version-modal',
    loadChildren: () => import('./version-modal/version-modal.module').then( m => m.VersionModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
