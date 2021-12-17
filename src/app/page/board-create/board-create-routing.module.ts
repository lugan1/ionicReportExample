import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardCreatePage } from './board-create.page';

const routes: Routes = [
  {
    path: '',
    component: BoardCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardCreatePageRoutingModule {}
