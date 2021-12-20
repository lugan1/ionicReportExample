import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RequestLogin} from "../model/request_Login";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  BASE_URL = "http://10.20.0.38:8087";

  constructor(private httpClient:HttpClient) {
  }


  Post_Login(id:string, password:string):Observable<any>{

    let requst_Login:RequestLogin = {
      id,
      password
    }
    return this.httpClient.post(this.BASE_URL+'/api/back/user/login',requst_Login)
  }

  Post_Logout():Observable<string>{
    return this.httpClient.post(this.BASE_URL+'/api/back/user/logout',{},{responseType:"text"})
  }


}
