import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedModalPage } from './saved-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SavedModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedModalPageRoutingModule {}
