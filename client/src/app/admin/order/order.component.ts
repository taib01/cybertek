import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IOrderDis } from 'src/app/shared/models/order';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders : IOrderDis[] = [] ;
  adminTest = localStorage.getItem("token-admin");


  constructor( private orderService : OrderService , private route : Router) { }

  ngOnInit() {
    this.getOrder();
  }

  getOrder(){
    this.orderService.getListOrder().subscribe(response => 
      {
        this.orders=[...response];
        console.log("orders :")
        console.log(this.orders);
      } ,error =>
      {
        console.log(error);
      }
    )
  }

  confirmorder(id:number){
    this.orderService.confirmOrder(id).subscribe(response => 
      {
        window.location.reload();
      } ,error =>
      {
        console.log(error);
      }
    )
  }
  waitingorder(id:number){
    this.orderService.waitingOrder(id).subscribe(response => 
      {
        window.location.reload();
      } ,error =>
      {
        console.log(error);
      }
    )
  }
  cancelorder(id:number){
    this.orderService.cancelOrder(id).subscribe(response => 
      {
        window.location.reload();
      } ,error =>
      {
        console.log(error);
      }
    )
  }
}
