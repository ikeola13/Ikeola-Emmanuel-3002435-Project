import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesModalPage } from './messages-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MessagesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesModalPageRoutingModule {}
