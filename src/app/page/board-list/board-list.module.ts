import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoardListPageRoutingModule } from './board-list-routing.module';

import { BoardListPage } from './board-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoardListPageRoutingModule
  ],
  declarations: [BoardListPage]
})
export class BoardListPageModule {}
