import { Component, OnInit } from '@angular/core';
import { alertController } from '@ionic/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {SignUpService} from "../../service/sign-up.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  fg_signUp : FormGroup;

  constructor(private formBuilder:FormBuilder,
              private signUpService:SignUpService) {

    this.fg_signUp = formBuilder.group({
      id: [''],
      pw: [''],
      pw_verify: [''],
      name: ['']
      })
  }

  ngOnInit() {
  }


  public id_exists():Observable<any>{
    return
  }

  //async 익명함수를 open_submitAlert 에 할당한다.
  open_submitAlert = async () => {
    const alert = await alertController.create({
      header: '제출확인',
      message: '정말로 제출하시겠습니까?',
      buttons: [
        {text: '아니오'},
        {text:'예', handler : ()=>{ console.log(this.fg_signUp) }
        }
        ]
    });
    await alert.present();
    // alert 오브젝트가 생성되고 난 다음에 표시한다.
  }


}
