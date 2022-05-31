import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-product-details2',
  templateUrl: './product-details2.component.html',
  styleUrls: ['./product-details2.component.scss']
})
export class ProductDetails2Component implements OnInit {
  product : IProduct ; 
  quantity = 1 ;

  constructor(private adminService : AdminService , 
              private activetedRoute : ActivatedRoute,
              private basketService: BasketService) { }

  ngOnInit() {
    this.loadProduct();
  }
  addItemToBasket(){
    this.basketService.addItemToBasket(this.product,this.quantity);
  }
  incrementQuantity(){
    this.quantity++;
  }
  decrementQuantity(){
    if (this.quantity >1)
    this.quantity--;
  }


  loadProduct(){
    this.adminService.getProduct(+this.activetedRoute.snapshot.paramMap.get('id')).subscribe(product =>{
      this.product = product;
    },error=>{
      console.log(error);
    });
  }

}
