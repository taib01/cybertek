import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
      passowrd:[null,[Validators.required,Validators.pattern("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$")]]
    });
  }

  onSubmit(){
    if (this.registerForm.valid){

      this.accountService.register(this.registerForm.value).subscribe(response => {
        this.router.navigateByUrl('/shop');
      }, error => {
      console.log(error);
      //this.errors = error.errors;
      this.errors =["L'adresse e-mail est utilisée"];
      });

    }else{
      this.errors=["Remplir tous les champ"];
      setTimeout(()=>{ this.errors.splice(0,this.errors.length)}, 2500);
    }
  }

}
