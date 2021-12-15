import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardListPage } from './board-list.page';

const routes: Routes = [
  {
    path: '',
    component: BoardListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardListPageRoutingModule {}
