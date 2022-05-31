import { Component, OnInit } from '@angular/core';
import { CheckoutService } from './checkout.service';
import { IOrderDis } from '../shared/models/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  orders : IOrderDis[] = [] ; 
  // products : IProduct[];

  constructor(private checkoutService : CheckoutService) { }

  ngOnInit() {
    this.getOrder();
    
  }
  getOrder(){
    this.checkoutService.getListOrder().subscribe(response => 
      {
        this.orders=[...response];
        console.log(this.orders);
      } ,error =>
      {
        console.log(error);
      }
    )
  }

}
