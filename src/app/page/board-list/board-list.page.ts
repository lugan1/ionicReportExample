import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {BoardService} from "../../service/board.service";
import {IonInfiniteScroll, MenuController} from "@ionic/angular";
import {Board} from "../../model/board";
import {BoardList} from "../../model/boardList";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {TokenStorageService} from "../../service/token-storage-service";

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.page.html',
  styleUrls: ['./board-list.page.scss'],
})
export class BoardListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  boardListHeader : BoardList;
  boardList : Board[]

  page_offset : number = 0;
  page_limit : number = 10;


  constructor(
    private boardService:BoardService,
    private menuController:MenuController,
    private authService:AuthenticationService,
    private router:Router,
    private tokenStorageService:TokenStorageService) {

  }

  ngOnInit() {
  }

  logoutButtonClick(){
    this.authService.Post_Logout().subscribe(
      data=>{
        this.tokenStorageService.logout();
        //sessionStorage에 있는 값들을 전부 지운다.
        this.router.navigate([''])
        //메인 메뉴로 돌아간다.
      }
    )
  }

  open_slideMenu(){
    this.menuController.open()
  }


  ionViewWillEnter(){
    this.boardService.get_BoardList(0,10).subscribe(
      data=>{

        this.boardListHeader = data;
        this.boardList = data.items;
      }
    )
  }

  move_boardDetail(idx:number){
    let board = this.boardService.get_Board(idx)
  }

  loadBottomData(event) {
    setTimeout(() => {

      this.page_offset = this.page_limit;
      this.page_limit = this.page_limit+10;

      this.boardService.get_BoardList(this.page_offset, this.page_limit).subscribe(
        data=>{
          this.boardListHeader = data;
          for (let item of data.items) {
            this.boardList.push(item)
          }
        }
      );


      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.boardList.length == 20) {
        event.target.disabled = true;
      }
    }, 500);
  }


  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
