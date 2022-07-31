import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AppComponent } from '../app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginAdminComponent } from './login-admin/login-admin.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, UpdateProfileComponent, LoginAdminComponent],
  imports: [
    CommonModule,
    AccountRoutingModule  ,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl:'never'}),
    
    SharedModule
  ]
})
export class AccountModule { }
