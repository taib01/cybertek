import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBsaket } from '../shared/models/basket';

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
    },error =>{
      console.log(error);
    })
  }

  getCurrentBasketValue(){
    return this.basketSource.value; 
  }
}
