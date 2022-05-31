import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IBasketItem, IBsaket } from '../shared/models/basket';
import { IOrder } from '../shared/models/order';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBsaket>;
  orderCofirmation:string;
  
  constructor(private basketService : BasketService , private router : Router) { }

  ngOnInit() {
    this.basket$=this.basketService.basket$;
    this.orderCofirmation = this.basketService.orderCofirmation;
  }

  removeBasketItem(item:IBasketItem){
    this.basketService.removeItemFromBasket(item);
  }

  incrementItemQuatity(item:IBasketItem){
    this.basketService.incrementItemQuatity(item);
  }

  decrementItemQuatity(item:IBasketItem){
    this.basketService.decrementItemQuatity(item);
  }
  
  passeOrder(){
    this.basketService.setOrder() ;
    //this.router.navigateByUrl('/checkout');
  }

}
