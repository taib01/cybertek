import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { privateDecrypt } from 'crypto';
import { DraggableItemService } from 'ngx-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasketItem, IBasketTotals, IBsaket } from '../shared/models/basket';
import { IOrder, Order } from '../shared/models/order';
import { IProduct } from '../shared/models/product';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BasketService { 
  baseUrl = environment.apiUrl ; 
   orderCofirmation :string ;
  /////
  private basketSource = new BehaviorSubject<IBsaket>(null);
  basket$ = this.basketSource.asObservable();
  //////////
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();


  

  /*
  private today = new Date();
  private dd = String(this.today.getDate()).padStart(2, '0');
  private mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  private yyyy = String(this.today.getFullYear());
  private dateString : string ; 
  this.dateString = this.mm + '/' + this.dd + '/' + this.yyyy;
  */
  
   
  
   

  // static num: number=2;
  // private basketSource2 = new BehaviorSubject<IBsaket>(null); 
  // private basketSource3 = new Basket();


  constructor( private http : HttpClient ,private router : Router ) { 
    
    
  }
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
    /*console.log(this.getDate());
    this.basketId = this.basketSource.value.id ;
    console.log(this.basketId);*/
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
    const shipping=7;
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
     setOrder () {
      var basket_object = localStorage.getItem('basketObject')  ;
      var basket_object2= JSON.parse(basket_object)
      const basket_id = basket_object2.basket_id ;
      const token_client = localStorage.getItem('token') ; 
      if ( basket_id && token_client){
        let item = new Order() ;
        item.basketId = basket_id ; 
        item.shippingPrice = 7;
        item.date = this.getDate();
        item.total=this.basketTotalSource.value.total ;
        //
      
      //console.log(item);

      var headers = new HttpHeaders();
      var token = localStorage.getItem('token');
      headers = headers.set('Authorization',`Bearer ${token}`);
   
      return this.http.post(this.baseUrl+'order',item,{headers}).subscribe( response => {
        console.log(response) ; 
        localStorage.removeItem('basketObject');
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        this.router.navigateByUrl('/checkout');
      });
      }else
      {
        this.orderCofirmation = ' u need to be connecté and ur basket not empty';
        setTimeout(()=>{ this.orderCofirmation = '' ;}, 3000);
        this.router.navigateByUrl('/account/login');
      }


    }

    private getDate (){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = String(today.getFullYear());
      var dateString : string ; 
      dateString = dd + '/' + mm + '/' + yyyy;
      return dateString;
    }


}
