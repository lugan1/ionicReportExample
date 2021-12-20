import { Component, OnInit } from '@angular/core';
import { alertController } from '@ionic/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {SignUpService} from "../../service/sign-up.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  fg_signUp : FormGroup;
  id_duplicate_valid : boolean = false;
  name_duplicate_valid : boolean = false;

  constructor(private formBuilder:FormBuilder, private  signUpService:SignUpService, private nvCtrl:NavController) {
    this.fg_signUp = this.formBuilder.group({
      id: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
      pw: this.formBuilder.control('',[Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")]),
      pw_verify: [''],
      name: this.formBuilder.control('',[Validators.required, Validators.minLength(4)])
    },{validators:this.checkPassword})
    //회원가입 formGrup 생성

  }


  ngOnInit() {
    this.fg_signUp.controls['id'].valueChanges.subscribe(data=>{
      this.id_duplicate_valid = false;
    })
    // 폼컨트롤의 입력값이 바뀌면, ID 중복검사를 다시 해야된다.

    this.fg_signUp.controls['name'].valueChanges.subscribe(data=>{
      this.name_duplicate_valid = false;
    })
    // 폼컨트롤의 입력값이 바뀌면, 닉네임 중복검사를 다시 해야된다.
  }

  ngOnDestroy(){

  }


  public check_id_exists() : void{
    this.signUpService.Get_existsId(this.fg_signUp.controls['id'].value).subscribe(data=> {
      if(data != 0){
        this.id_duplicate_valid = false;
        this.fg_signUp.controls['id'].setErrors({"duplicate":true});
        this.open_CustomAlert("중복확인", "중복되는 아이디가 존재합니다.");
      }
      if(data == 0){
        this.id_duplicate_valid = true;
      }
    })
  }

  public check_name_exists() : void{
    this.signUpService.Get_existsName(this.fg_signUp.controls['name'].value).subscribe(data=> {
      if(data != 0){
        this.name_duplicate_valid = false;
        this.fg_signUp.controls['name'].setErrors({"duplicate":true});
        this.open_CustomAlert("중복확인", "중복되는 닉네임 존재합니다.");
      }
      if(data == 0){
        this.name_duplicate_valid = true;
      }
    })
  }


  //패스워드 verify 커스텀 Valdiator
  checkPassword: ValidatorFn = (abstractControl:AbstractControl): ValidationErrors | null => {
    let pw = abstractControl.get('pw').value;
    let pw_verify = abstractControl.get('pw_verify').value;

    if(pw != pw_verify){
      return {notSame:true}
    }
    return null
  };


  //async 익명함수를 open_submitAlert 에 할당한다.
  open_submitAlert = async () => {
    const alert = await alertController.create({
      header: '제출확인',
      message: '정말로 제출하시겠습니까?',
      buttons: [
        {text: '아니오'},
        {text:'예', handler : ()=>{
          this.signUpService.Post_signUp(this.fg_signUp.controls['name'].value, this.fg_signUp.controls['id'].value, this.fg_signUp.controls['pw'].value)
            .subscribe(data=>{
              if(data == 1){
                this.open_SignUpSuccess('가입완료','축하합니다. 가입이 완료되었습니다.')
              }
            })}
        }
        ]
    });
    await alert.present();
    // alert 오브젝트가 생성되고 난 다음에 표시한다.
  };

  open_CustomAlert = async (title:string, content:string) =>{
    const alert = await alertController.create({
      header:title,
      message:content,
      buttons: [{text: '확인'}]
    });
    await alert.present();
  };


  open_SignUpSuccess = async (title:string, content:string) =>{
    const alert = await alertController.create({
      header:title,
      message:content,
      buttons: [{text: '확인', handler:()=>{
        this.nvCtrl.pop();
          // ionic NavController.pop() : 현재의 뷰를 스택에서 제거한다.
        }}]
    });
    await alert.present();
  };


}
