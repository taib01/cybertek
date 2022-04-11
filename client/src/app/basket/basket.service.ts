import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { privateDecrypt } from 'crypto';
import { DraggableItemService } from 'ngx-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasketItem, IBsaket } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl ; 
  private basketSource = new BehaviorSubject<IBsaket>(null);
  basket$ = this.basketSource.asObservable();


  constructor( private http : HttpClient) { }

  getBasket(id: number){
    return this.http.get(this.baseUrl+'basket?id='+id)
                  .pipe(
                    map((basket:IBsaket)=>{
                      this.basketSource.next(basket);
                    })
                  );
  }

  setBasket(basket:IBsaket){
    return this.http.post(this.baseUrl+'basket',basket).subscribe((response:IBsaket)=>{
      this.basketSource.next(response); 
      console.log(response);
    },error =>{
      console.log(error);
    })
  }

  getCurrentBasketValue(){
    return this.basketSource.value; 
    //return localStorage.getItem("basket_id");
  }




  addItemToBasket(item : IProduct ,quantity=1){
    const itemToAdd : IBasketItem = this.mapProductItemToBasketItem(item,quantity);
    //const basket = this.getCurrentBasketValue() ?? this.createBasket(); 
    let basket = this.getCurrentBasketValue() ;
    if ( basket ===null ){
      basket=this.createBasket();
    }
    basket.items=this.addOrUpdateItem(basket.items,itemToAdd,quantity);
    this.setBasket(basket);

  }
  private addOrUpdateItem(items :IBasketItem[],itemToAdd:IBasketItem,quantity:number):IBasketItem[]
  {
    const index =items.findIndex(i=>i.idProduct ===itemToAdd.idProduct);
    if ( index ===-1){
      itemToAdd.quantity=quantity; 
      items.push(itemToAdd);
    }else{
      items[index].quantity += quantity ; 
    }
    return items ; 
  }



  private createBasket(){

    const basket =new Basket();
    //basket.id.toString()
    /// lazem ngeneri kol mara basket_id jdida  
    localStorage.setItem('basket_id','3');
    return basket ; 
  }

  private mapProductItemToBasketItem(item:IProduct,quantity:number):IBasketItem{
    return{
      //id : item.id,
      id:0,
      idProduct :item.id,
      productName : item.name,
      price : item.price ,
      pictureUrl : item.pictureUrl,
      quantity,
      brand : item.productBrand,
      type : item.productType
    }
  }



}
