import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  resMessage:string;
  colorMessage:string;


  constructor(private accountService : AccountService , private router : Router) { }

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
       this.router.navigateByUrl('/shop');
       //this.resMessage='user logged ';
       //this.colorMessage='success';
       //setTimeout(function() { this.resMessage=""; }, 1000);
     }, error => {
       this.resMessage=error.error.message;
       this.colorMessage='danger';
       console.log(error);
       console.log(this.resMessage);
     });
  }
}
