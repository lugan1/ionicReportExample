import {Component, OnInit, Optional} from '@angular/core';
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

  constructor(private tokenStorageService: TokenStorageService,) { }

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



}
