import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalModalPage } from './personal-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalModalPageRoutingModule {}
