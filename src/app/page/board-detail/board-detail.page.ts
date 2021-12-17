import { Component, OnInit } from '@angular/core';
import {BoardService} from "../../service/board.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Board} from "../../model/board";
import {alertController} from "@ionic/core";


@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.page.html',
  styleUrls: ['./board-detail.page.scss'],
})
export class BoardDetailPage implements OnInit {

  idx : number;
  board: Board | undefined;

  constructor(private boardService:BoardService,
              private activatedRoute:ActivatedRoute,
              private router:Router) {

    this.idx = this.activatedRoute.snapshot.params["idx"]

    this.board = new Board();

    this.boardService.get_Board(this.idx).subscribe(
      data=>{
        this.board = data;
      }
    )

  }

  ngOnInit() {
  }

  move_modify(){
    console.log("idx : "+this.idx)
    this.router.navigate(['board-modify',this.idx])
  }

  open_deleteAlert = async () => {
    const alert = await alertController.create({
      header: '게시글 삭제 확인',
      message: '정말로 삭제 하시겠습니까?',
      buttons: [
        {text: '아니오'},
        {text:'예', handler : ()=>{
          this.boardService.delete_Board(this.idx).subscribe(data=>{
            this.router.navigate(['/board-list'])
          })
          }
        }
      ]
    });
    await alert.present();
    // alert 오브젝트가 생성되고 난 다음에 표시한다.
  };

}
