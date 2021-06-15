import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'about-modal',
    loadChildren: () => import('./about-modal/about-modal.module').then( m => m.AboutModalPageModule)
  },
  {
    path: 'messages-modal',
    loadChildren: () => import('./messages-modal/messages-modal.module').then( m => m.MessagesModalPageModule)
  },
  {
    path: 'personal-modal',
    loadChildren: () => import('./personal-modal/personal-modal.module').then( m => m.PersonalModalPageModule)
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
