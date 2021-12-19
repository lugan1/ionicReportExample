import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./service/token-storage-service";
import {IonRouterOutlet, Platform, ToastController} from "@ionic/angular";
import {RouterOutlet} from "@angular/router";
import {App} from "@capacitor/app";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService, public toastController:ToastController, private platform: Platform, private routerOutlet:IonRouterOutlet) {
    this.platform.backButton.subscribeWithPriority(-1, ()=>{
      console.log("백버튼 클릭");
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    })
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;


      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.logout();
    window.location.reload();
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: '뒤로 버튼을 한번 더 누르시면 종료 됩니다.',
      duration: 2000
    });
    toast.present();
  }

}
