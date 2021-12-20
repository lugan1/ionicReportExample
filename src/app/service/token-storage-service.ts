import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }


  public logout(){
    window.sessionStorage.clear();
  }



  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    //세션 스토리지에 있는 token 제거

    window.sessionStorage.setItem(TOKEN_KEY, token);
    // 세션 스토리지에 새로 토큰 저장, 키값은 TOKEN_KEY (auth-token)
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

}
