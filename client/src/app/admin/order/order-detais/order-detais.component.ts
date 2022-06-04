import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBsaket } from 'src/app/shared/models/basket';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detais',
  templateUrl: './order-detais.component.html',
  styleUrls: ['./order-detais.component.scss']
})
export class OrderDetaisComponent implements OnInit {

  
  //private basketSource = new BehaviorSubject<IBsaket>(null);
  //basket$ = this.basketSource.asObservable();
  //basket$: Observable<IBsaket>;

  basket$: Observable<IBsaket>;

  private id : number ; 
  constructor( private route : ActivatedRoute, private orderService :OrderService) {
    this.id=this.route.snapshot.params.id;  
    
   }


  ngOnInit() {
    this.loadBasket();
    
    //this.basketSource= this.orderService.basketSource;
   // this.basket$ = this.orderService.basket$;
    
    //console.log(this.basket$); 
    
  
  }
  loadBasket(){
    this.orderService.getBasket(this.id).subscribe(()=>
    {
      console.log('initialised basket');
      this.basket$=this.orderService.basket$;
    },error =>{
      console.log(error);
    });
}

}
