import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  fg_login : FormGroup;

  constructor(private formBuilder : FormBuilder) {

    this.fg_login = formBuilder.group({
      "id":[''],
      "password" : ['']
    })
  }




  public move_signUp() : void{

  }

}
