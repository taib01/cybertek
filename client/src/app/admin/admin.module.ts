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
import { UpdateBrandComponent } from './update-brand/update-brand.component';
import { UpdateTypeComponent } from './update-type/update-type.component';
import { UpdateProductComponent } from './update-product/update-product.component';




@NgModule({
  declarations: [AdminComponent, ProductItem2Component, ProductDetails2Component, UpdateBrandComponent, UpdateTypeComponent, UpdateProductComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl:'never'}),
    //RouterModule
    AdminRoutingModule
  ]
})
export class AdminModule { }
