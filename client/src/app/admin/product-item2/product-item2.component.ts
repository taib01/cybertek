import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-item2',
  templateUrl: './product-item2.component.html',
  styleUrls: ['./product-item2.component.scss']
})
export class ProductItem2Component implements OnInit {
  @Input() product : IProduct;

  constructor(private basketService : BasketService) { }

  ngOnInit() {
  }
  addItemToBasket(){
    this.basketService.addItemToBasket(this.product);
  }

}
