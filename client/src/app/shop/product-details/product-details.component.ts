import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product : IProduct ; 
  quantity = 1 ;

  constructor(private shopService : ShopService , 
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
    this.shopService.getProduct(+this.activetedRoute.snapshot.paramMap.get('id')).subscribe(product =>{
      this.product = product;
    },error=>{
      console.log(error);
    });
  }

}
