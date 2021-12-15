import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BoardList} from "../model/boardList";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private httpClient:HttpClient) {
  }

  public get_BoardList(page_offset:number, page_limit:number, search_word?:string, search_option?:string, column?:string, order?:string):Observable<BoardList>{
    
    return this.httpClient.get('http://localhost:8087/api/back/board/getBoardList', params)
  }

}
