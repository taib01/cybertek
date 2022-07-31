import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
  loginForm:FormGroup;
  resMessage:string;
  colorMessage:string;
  returnUrl: string ; 


  constructor(private accountService : AccountService , private router : Router , private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.createLoginForm();
    this.returnUrl= this.activatedRoute.snapshot.queryParams.returnUrl || '/admin' ;
  }

  createLoginForm(){
    this.loginForm=new FormGroup({
      email : new FormControl ('',[Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      passowrd : new FormControl('',Validators.required)
    });
  }

  onSubmit()
  {
    if (this.loginForm.valid)
    {
        this.loginForm.value.email=this.loginForm.value.email.toLowerCase() ; 
        this.accountService.loginAdmin(this.loginForm.value).subscribe( () =>
        {
          //this.router.navigateByUrl(this.returnUrl);
          /*this.router.navigate(['/shop']).then(()=>{
            window.location.reload();
          }) ;*/
          
          
          
        }, error => 
        {
          //this.resMessage=error.error.message;
          this.resMessage="Vérifiez vos informations";
          this.colorMessage='danger';
          console.log(error);
          console.log(this.resMessage);
        });
        
    }else
    {
      this.resMessage = 'Remplir tous les champ ' ;
      this.colorMessage= 'danger';
      setTimeout(()=>{ this.resMessage = '' ;}, 2500);
    }
    //setTimeout(()=>{
    //  this.accountService.loadCurrentUser(localStorage.getItem('token'));
    //}, 2500);
   
    
  }
  
}
