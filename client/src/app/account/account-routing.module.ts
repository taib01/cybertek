import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';


const routes : Routes =[
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'updateprofile',component:UpdateProfileComponent},
  {path:'admin',component:LoginAdminComponent}
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule,
    
  ]
})
export class AccountRoutingModule { }
