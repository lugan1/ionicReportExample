import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NavController} from "@ionic/angular";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {TokenStorageService} from "../../service/token-storage-service";

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
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private router:Router, private formBuilder:FormBuilder, private authService: AuthenticationService, private tokenStorage: TokenStorageService) {

    this.fg_login = formBuilder.group({
      "id":[''],
      "password" : ['']
    })
  }

  test(){
    this.router.navigate(['board-list'])
  }

  submit_login(){
    this.authService.Post_Login(this.fg_login.controls['id'].value, this.fg_login.controls['password'].value)
      .subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.router.navigate(['board-list'])
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      )
  }

}
