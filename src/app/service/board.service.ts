import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {BoardList} from "../model/boardList";
import {Board} from "../model/board";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private httpClient:HttpClient) {
  }

  public get_BoardList(page_offset:number, page_limit:number, search_word?:string, search_option?:string, column?:string, order?:string):Observable<BoardList>{
    const params : HttpParams =new HttpParams().append('page_offset',page_offset).append('page_limit',page_limit);

    if(search_option != undefined && search_word != undefined){
      const search_params : HttpParams =new HttpParams().append('page_offset',page_offset).append('page_limit',page_limit).append("search_word",search_word).append("search_option",search_option);
      return this.httpClient.get<BoardList>('http://localhost:8087/api/back/board/getBoardList', {params:search_params})
    }

    return this.httpClient.get<BoardList>('http://localhost:8087/api/back/board/getBoardList', {params:params})
  }

  public get_Board(idx:number):Observable<Board>{
    return this.httpClient.get<Board>('http://localhost:8087/api/back/board/getPostHit',{params:{idx:idx}})
  }

  public create_Board(title:string, content:string):Observable<number>{
    let req_board = {
      title:title,
      content:content
    };
    return this.httpClient.post<number>('http://localhost:8087/api/back/board/insertPost',req_board)
  }

  public delete_Board(idx:number):Observable<number>{
    let params = 'idx='+idx
    return this.httpClient.post<number>('http://localhost:8087/api/back/board/deletePost?'+params,'')
  }
}
