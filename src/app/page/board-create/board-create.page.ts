import { Component, OnInit } from '@angular/core';
import {alertController} from "@ionic/core";
import {BoardService} from "../../service/board.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-board-create',
  templateUrl: './board-create.page.html',
  styleUrls: ['./board-create.page.scss'],
})
export class BoardCreatePage implements OnInit {

  fg_board:FormGroup;


  constructor(private boardService:BoardService, private router:Router, private formBuilder:FormBuilder) {
    this.fg_board = formBuilder.group({title:'', content:'' })
  }

  ngOnInit() {
  }

  //async 익명함수를 open_submitAlert 에 할당한다.
  open_submitAlert = async () => {
    const alert = await alertController.create({
      header: '제출확인',
      message: '정말로 제출하시겠습니까?',
      buttons: [
        {text: '아니오'},
        {text:'예', handler: ()=>{
          console.log("title "+this.fg_board.controls['title'].value+" content : "+this.fg_board.controls['content'].value)
          this.boardService.create_Board(this.fg_board.controls['title'].value, this.fg_board.controls['content'].value)
            .subscribe(data=>{
              console.log("data : "+data);
              this.router.navigate(['/board-list'])
            })
          }}
      ]
    });
    await alert.present();
    // alert 오브젝트가 생성되고 난 다음에 표시한다.
  };
}
