import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-board-modify',
  templateUrl: './board-modify.page.html',
  styleUrls: ['./board-modify.page.scss'],
})
export class BoardModifyPage implements OnInit {

  constructor(private navController:NavController) { }

  ngOnInit() {
  }

  back_click(){
    this.navController.pop()
  }

}
