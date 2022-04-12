import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBsaket } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBsaket>;
  constructor(private basketService : BasketService) { }

  ngOnInit() {
    this.basket$=this.basketService.basket$;
  }
  

}
