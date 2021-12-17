import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Request_Login} from "../model/request_Login";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient:HttpClient) {
  }


  Post_Login(id:string, password:string):Observable<any>{

    let requst_Login:Request_Login = {
      id:id,
      password:password
    }
    return this.httpClient.post('http://localhost:8087/api/back/user/login',requst_Login)
  }

  Get_Logout():Observable<any>{
/*    return this.httpClient.get<string>('http://localhost:8087/api/back/user/logout')*/
    return this.httpClient.get('http://localhost:8087/api/back/user/logout',{responseType:"text"})
  }


}
