import { Component, OnInit } from '@angular/core';
import {BoardService} from "../../service/board.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Board} from "../../model/board";
import {alertController} from "@ionic/core";
import {Observable} from "rxjs";


@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.page.html',
  styleUrls: ['./board-detail.page.scss'],
})
export class BoardDetailPage implements OnInit {

  idx : number;
  board: Board | undefined;
  observable_board : Observable<Board>

  constructor(private boardService:BoardService,
              private activatedRoute:ActivatedRoute,
              private router:Router) {

    this.idx = this.activatedRoute.snapshot.params["idx"]

    this.board = new Board();

    this.observable_board = this.boardService.get_Board(this.idx)

  }

  ngOnInit() {
    console.log("ngOnInit()")
  }

  ionViewWillEnter(){
    //ngOninit 이후 페이지 전환이 일어나기 전 이벤트 발생한다.

    this.observable_board.subscribe(data=>{
      this.board = data
    });
    console.log("ionViewWillEnter()")
  }

  ionViewDidEnter(){
    //페이지 전환이 모두 완료된 후 이벤트 발생한다.
    console.log("ionViewDidEnter()")
  }

  ionViewWillLeave(){
    //현재 페이지에서 나가기 직전에 이벤트 발생한다.
    console.log("ionViewWillLeave()")
  }

  ionViewDidLeave(){
    //현재 페이지에서 완전히 나간 후 새로운 페이지로 완전히 전환된 후 즉, 새 페이지의 ionViewDidEnter 이후에 이벤트 발생한다.
    console.log("ionViewDidLeave()")
  }


  move_modify(){

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
