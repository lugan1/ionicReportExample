import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Request_SignUp} from "../model/request_SignUp";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private httpClient:HttpClient) { }


  public Post_signUp(signUp:Request_SignUp):Observable<any>{
    return this.httpClient.post<any>('http://localhost:8087/api/back/user/insertUser',signUp);
  }

  public Get_existsId(id:string):Observable<any>{
    let params = new HttpParams().set("id", id);

    return this.httpClient.get<any>('http://localhost:8087/api/back/user/existsId', {params:params});
  }

  public Get_existsName(name:string):Observable<any>{
    let params = new HttpParams().set("name", name);

    return this.httpClient.get<any>('http://localhost:8087/api/back/user/existsName', {params:params});
  }

}
