import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardListPage } from './board-list.page';
import {BoardDetailPage} from "../board-detail/board-detail.page";

const routes: Routes = [
  {
    path: '',
    component: BoardListPage
  }
  ,{
  path:'/detail',
    component:BoardDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardListPageRoutingModule {}
