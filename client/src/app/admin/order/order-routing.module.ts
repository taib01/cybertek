import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { OrderDetaisComponent } from './order-detais/order-detais.component';

const routes : Routes =[
  {path:'', component: OrderComponent},
  {path:'details', component: OrderDetaisComponent}
  
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
export class OrderRoutingModule { }
