import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {BoardService} from "../../service/board.service";
import {Board} from "../../model/board";
import {FormBuilder, FormGroup} from "@angular/forms";
import {alertController} from "@ionic/core";

@Component({
  selector: 'app-board-modify',
  templateUrl: './board-modify.page.html',
  styleUrls: ['./board-modify.page.scss'],
})
export class BoardModifyPage implements OnInit {

  idx : number;
  board:Board;
  fg_board : FormGroup;

  constructor(private navController:NavController,
              private activatedRoute:ActivatedRoute,
              private boardService:BoardService,
              private formBuilder:FormBuilder,
              private router:Router) {
    this.idx = this.activatedRoute.snapshot.params['idx'];
    this.fg_board = this.formBuilder.group({
      title:'',
      content:''
    });
  }

  ngOnInit() {
    this.boardService.get_board_noHit(this.idx).subscribe(data=>{
      this.board = data;
      this.fg_board.controls['title'].setValue(data.title);
      this.fg_board.controls['content'].setValue(data.content);
    })
  }

  back_click(){
    this.navController.pop();
  }

  open_modifyAlert = async () => {
    const alert = await alertController.create({
      header: '게시글 수정 확인',
      message: '제출 하시겠습니까?',
      buttons: [
        {text: '아니오'},
        {text:'예', handler : ()=>{
            this.boardService.modify_Board(
              this.board.idx,
              this.fg_board.controls['title'].value,
              this.fg_board.controls['content'].value).subscribe(
              data=>{
                this.boardService.get_Board(this.board.idx)
                this.router.navigate(['board-detail',this.board.idx])
              }
            )
          }
        }
      ]
    });
    await alert.present();
    // alert 오브젝트가 생성되고 난 다음에 표시한다.
  };

}
