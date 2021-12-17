import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoardCreatePageRoutingModule } from './board-create-routing.module';

import { BoardCreatePage } from './board-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoardCreatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BoardCreatePage]
})
export class BoardCreatePageModule {}
