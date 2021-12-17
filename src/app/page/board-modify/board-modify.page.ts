import { Component, OnInit } from '@angular/core';
import {BoardService} from "../../service/board.service";

@Component({
  selector: 'app-board-modify',
  templateUrl: './board-modify.page.html',
  styleUrls: ['./board-modify.page.scss'],
})
export class BoardModifyPage implements OnInit {

  idx :number;

  constructor(private boardService:BoardService, private activatedRoute) {
/*    this.idx = activatedRoute.snapshot.params['idx']*/
  }

  ngOnInit() {
/*    this.boardService.get_Board(this.idx).subscribe(
      data=>{
        console.log("data : "+data)
      }
    )*/
  }

}
