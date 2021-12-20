import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {IonRouterOutlet, NavController, Platform, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {TokenStorageService} from "../../service/token-storage-service";
import {App} from "@capacitor/app";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  fg_login : FormGroup;

  form: any = {
    username: null,
    password: null
  };
  errorMessage = '';
  roles: string[] = [];

  exit_app = false;

  constructor(private router:Router,
              private formBuilder:FormBuilder,
              private authService: AuthenticationService,
              private tokenStorage: TokenStorageService,
              private platform: Platform,
              private routerOutlet:IonRouterOutlet,
              public toastController:ToastController) {

    this.fg_login = formBuilder.group({
      "id":[''],
      "password" : ['']
    })

    this.platform.backButton.subscribeWithPriority(-1, ()=>{
      console.log("백버튼 클릭");
      console.log("routerOutlet canGoback() : "+this.routerOutlet.canGoBack())
      if(this.routerOutlet.canGoBack() == false){
        if(this.exit_app == false){
          this.presentToast();
        }
        if(this.exit_app == true){
          navigator['app'].exitApp();
        }
        this.exit_app = true;
      }
    })

  }

  submit_login(){
    this.authService.Post_Login(this.fg_login.controls['id'].value, this.fg_login.controls['password'].value)
      .subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);

          this.roles = this.tokenStorage.getUser().roles;
          this.router.navigate(['board-list'])
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: '뒤로 버튼을 한번 더 누르시면 종료 됩니다.',
      duration: 2000
    });
    toast.present();
  }

}
