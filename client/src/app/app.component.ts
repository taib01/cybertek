import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Client';

  constructor(private basketservice : BasketService, private accountService : AccountService) {}

  ngOnInit(): void {
    this.loadBasket();
    this.loadUser();

  }

  loadUser(){
    const token = localStorage.getItem('token');
    if(token){
      this.accountService.loadCurrentUser(token).subscribe(()=>{
        console.log('loaded user');
      },error =>{
        console.log(error);
      });

    }
  }

  loadBasket(){
    var basket_object = localStorage.getItem('basketObject')  ;
    var basket_object2= JSON.parse(basket_object)
    const basket_id = basket_object2.basket_id;
    if ( basket_id) 
    {
      this.basketservice.getBasket(basket_id).subscribe(()=>
      {
        console.log('initialised basket');
      },error =>{
        console.log(error);
      })
    }
  }
    
    /*
    this.http.get('https://localhost:5001/api/products?pageSize=50')
             .subscribe((response:IPagination) =>{
               this.products=response.data;
               //console.log(response.data);
             },error =>{
               console.log(error);
             });
    */

         
  
}
