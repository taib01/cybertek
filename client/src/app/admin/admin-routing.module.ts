import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProductDetails2Component } from './product-details2/product-details2.component';
import { UpdateBrandComponent } from './update-brand/update-brand.component';
import { UpdateTypeComponent } from './update-type/update-type.component';


const routes : Routes =[
  {path:'', component: AdminComponent},
  {path:'updatebrand', component:UpdateBrandComponent},
  {path:'updatetype', component:UpdateTypeComponent}
  //{path:':id' , component :ProductDetails2Component},
  
];

@NgModule({
  declarations: [],
  imports: [
    //CommonModule
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AdminRoutingModule { }

