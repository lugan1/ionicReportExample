import {Injectable} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "../service/token-storage-service";



const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{
  constructor(private token: TokenStorageService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    // SessionStorage에 들어있는 Token 을 가져온다.

    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq);
  }

}

