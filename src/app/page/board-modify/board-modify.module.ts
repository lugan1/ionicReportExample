import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoardModifyPageRoutingModule } from './board-modify-routing.module';

import { BoardModifyPage } from './board-modify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoardModifyPageRoutingModule
  ],
  declarations: [BoardModifyPage]
})
export class BoardModifyPageModule {}
