import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardModifyPage } from './board-modify.page';

const routes: Routes = [
  {
    path: '',
    component: BoardModifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardModifyPageRoutingModule {}
