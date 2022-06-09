import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Adress } from 'src/app/shared/models/adress';
import { IUser2, User2 } from 'src/app/shared/models/user';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup ; 
  errors : string[] ; 

  constructor(private fb : FormBuilder , private accountService : AccountService , private router : Router)
   {
   }

  ngOnInit() {
    this.creatteRegisterForm();
  }

  creatteRegisterForm(){
    this.registerForm = this.fb.group({
      displayName:[null,[Validators.required]],
      email : [null,[Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]] ,
      passowrd:[null,[Validators.required,Validators.pattern("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$")]],
      phoneNumber : [null ,[Validators.required,Validators.pattern("^[0-9]{8}$")]],
      firstName :[null,[Validators.required]] ,
      lastName :[null,[Validators.required]] ,
      street :[null,[Validators.required]] ,
      city :[null,[Validators.required]],
      state:[null,[Validators.required]] , 
      zipcode:[null,[Validators.required,Validators.pattern("^[0-9]+$")]]

    });
  }

  onSubmit(){
    if (this.registerForm.valid){
      
      //// mapping
      var adressobject =  new Adress() ;
        adressobject.firstName = this.registerForm.value.firstName;
        adressobject.lastName = this.registerForm.value.lastName;
        adressobject.street = this.registerForm.value.street ;
        adressobject.city   = this.registerForm.value.city ;
        adressobject.state  = this.registerForm.value.state ;
        adressobject.zipcode= this.registerForm.value.zipcode ;
    
      var user = new User2() ;
        user.email = this.registerForm.value.email;
        user.displayName=this.registerForm.value.displayName;
        user.passowrd=this.registerForm.value.passowrd ;
        user.adress  = adressobject ;
        user.phoneNumber=this.registerForm.value.phoneNumber;
      

      this.accountService.register(user).subscribe(response => {
        this.router.navigateByUrl('/shop');
      }, error => {
      console.log(error);
      
      if (error.errors[0]==="Email Adress is in use")
      {
        this.errors =["L'adresse e-mail est utilisée"];
        //setTimeout(()=>{ this.errors.splice(0,this.errors.length)}, 2500);
      }else{
        this.errors = error.errors;
        //setTimeout(()=>{ this.errors.splice(0,this.errors.length)}, 2500);
      }
      
      });

    }else{
      this.errors=["Remplir tous les champs"];
      setTimeout(()=>{ this.errors.splice(0,this.errors.length)}, 2500);
    }
  }

}
