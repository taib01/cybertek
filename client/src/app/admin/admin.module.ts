import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from '../shop/shop-routing.module';
import { ProductItemComponent } from '../shop/product-item/product-item.component';
import { ProductDetailsComponent } from '../shop/product-details/product-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductItem2Component } from './product-item2/product-item2.component';
import { ProductDetails2Component } from './product-details2/product-details2.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AdminComponent, ProductItem2Component, ProductDetails2Component],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    //RouterModule
    AdminRoutingModule
  ]
})
export class AdminModule { }
