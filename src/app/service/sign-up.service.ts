import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Request_SignUp} from "../model/request_SignUp";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private httpClient:HttpClient) { }


  public Post_signUp(name:string, id:string, password:string):Observable<number>{
    let req_signup:Request_SignUp = {
      name : name,
      id : id,
      password : password
    };
    return this.httpClient.post<number>('http://localhost:8087/api/back/user/insertUser',req_signup);
  }

  public Get_existsId(id:string):Observable<any>{
    let params = new HttpParams().append("id", id);

    return this.httpClient.get<any>('http://localhost:8087/api/back/user/existsId', {params:params});
  }

  public Get_existsName(name:string):Observable<any>{
    let params = new HttpParams().append("name", name);

    return this.httpClient.get<any>('http://localhost:8087/api/back/user/existsName', {params:params});
  }

}
