import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { privateDecrypt } from 'crypto';
import { DraggableItemService } from 'ngx-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasketItem, IBasketTotals, IBsaket } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService { 
  baseUrl = environment.apiUrl ; 
  /////
  private basketSource = new BehaviorSubject<IBsaket>(null);
  basket$ = this.basketSource.asObservable();
  //////////
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  // static num: number=2;
  // private basketSource2 = new BehaviorSubject<IBsaket>(null); 
  // private basketSource3 = new Basket();


  constructor( private http : HttpClient) { }
////// getting last id_basket from table ///////////// 
/*
  getLastIdOfBasket(){
    return this.http.get<IBsaket>(this.baseUrl+'basket/GetLastIdOfBasket')
  }  
  lisenToGetLastIdOfBasket(){
    return this.getLastIdOfBasket().subscribe( (response:IBsaket)=>
    {
       console.log(response);
        //BasketService.num=response.id;
        //this.num =response.id; 
        //this.basketSource3.id=response.id;
        //this.basketSource3.items=response.items; 
      },error =>{
        console.log(error);
      });
  } 
*/
  getBasket(id: number){
    return this.http.get(this.baseUrl+'basket?id='+id)
                  .pipe(
                    map((basket:IBsaket)=>{
                      this.basketSource.next(basket);
                      this.calculateTotals();
                      console.log(this.getCurrentBasketValue());
                    })
                  );
  }

  setBasket(basket:IBsaket){
    return this.http.post(this.baseUrl+'basket',basket).subscribe((response:IBsaket)=>{
      this.basketSource.next(response); 
      this.calculateTotals();
      console.log(response);

/// to save id basket in local storage /////////////////      
      var basketObject = { 'basket_id': response.id};
      localStorage.setItem('basketObject', JSON.stringify(basketObject));
      /*var basketObjectAfter = localStorage.getItem('basketObject');
      basketObject.basket_id=basketObject.basket_id+1;
      console.log('basketObjectAfter: ', JSON.parse(basketObjectAfter));*/
      console.log(localStorage.getItem('basketObject'));
      var basket_object = localStorage.getItem('basketObject')  ;
////////////////////////////////
    },error =>{
      console.log(error);
    });
  }

  getCurrentBasketValue(){
    return this.basketSource.value; 
    //return localStorage.getItem("basket_id");

  }

////// function tzid fi quatity l item ely fel basket
  incrementItemQuatity(item:IBasketItem){
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x=>x.idProduct === item.idProduct);
    basket.items[foundItemIndex].quantity++ ; 
    this.setBasket(basket);
  }
//////////

///////// function tna9es fi quatity l item ely fel basket
  decrementItemQuatity(item:IBasketItem){
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x=>x.idProduct === item.idProduct);
    if ( basket.items[foundItemIndex].quantity >1){
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    }else{
      this.removeItemFromBasket(item);
    }
  }
/////////// 

//////////  function tfase5 l item mn lbasket
  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if(basket.items.some(x=>x.id ===item.id)){
      basket.items=basket.items.filter(i=>i.id !== item.id);
      if (basket.items.length>0){
        this.setBasket(basket);
      }else{
        this.deleteBasket(basket);
      }
    }
  }
//////////

////////// function tfase5 lbasket bkolha
  deleteBasket(basket: IBsaket) {
    return this.http.delete(this.baseUrl+'basket?id='+basket.id).subscribe(()=>
    {
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');  
    },error =>{
      console.log(error);
    });
  }
/////////////



  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    const shipping=0;
    const subtotal = basket.items.reduce((a,b) =>(b.price * b.quantity)+a , 0);
    const total = subtotal + shipping ; 
    this.basketTotalSource.next({shipping,total,subtotal});
  }




  addItemToBasket(item : IProduct ,quantity=1){
    const itemToAdd : IBasketItem = this.mapProductItemToBasketItem(item,quantity);
    //const basket = this.getCurrentBasketValue() ?? this.createBasket(); 
    let basket = this.getCurrentBasketValue() ;
    if ( basket ===null ){
      basket=this.createBasket();
    }



    //basket.id=BasketService.idBasket ;
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
/*
     var basketObject = { 'basket_id': 1};
     localStorage.setItem('basketObject', JSON.stringify(basketObject));
     var basketObjectAfter = localStorage.getItem('basketObject');
     basketObject.basket_id=basketObject.basket_id+1;
     console.log('basketObjectAfter: ', JSON.parse(basketObjectAfter));

     let basket2 =new Basket();
     this.lisenToGetLastIdOfBasket();
     console.log(BasketService.num) ;
     console.log(this.basketSource3) ;
*/    
    //console.log(this.basketSource);

    const basket =new Basket();
    //localStorage.setItem('basket_id2','3');
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
