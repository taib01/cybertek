import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  resMessage:string;


  constructor(private accountService : AccountService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=new FormGroup({
      email : new FormControl ('',Validators.required),
      passowrd : new FormControl('',Validators.required)
    });
  }
  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe( () =>
     {
       console.log('user logged in good');
     }, error => {
       this.resMessage=error.error.message;
       console.log(error);
       console.log(this.resMessage);
     });
  }
}
