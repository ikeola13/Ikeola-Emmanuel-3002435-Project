import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersModalPage } from './users-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UsersModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersModalPageRoutingModule {}
