import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {errorObject} from "rxjs/internal-compatibility";
import {alertController} from "@ionic/core";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor{
  constructor(public router:Router) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error =>{

        switch (error.status){
          case 0 :
            this.open_CustomAlert("에러", "서버와 연결이 되지 않습니다.");
            break;
          case 401 :
            this.open_CustomAlert("에러", "인증 오류입니다.");
            break;
          case 400 :
            this.open_CustomAlert("에러", "잘못된 요청입니다.");
            break;
          case 500 :
            this.open_CustomAlert("에러","서버에서 에러가 발생했습니다.");
            break;
        }

        return throwError(error)
      })
    )
  }


  open_CustomAlert = async (title:string, content:string) =>{
    const alert = await alertController.create({
      header:title,
      message:content,
      buttons: [{text: '확인', handler: ()=>{
        this.router.navigate(['home']);
        }}]
    });
    await alert.present();
  };

}
