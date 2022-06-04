import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBsaket } from 'src/app/shared/models/basket';
import { IOrderDis } from 'src/app/shared/models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl ; 

  private token = localStorage.getItem('token');
  private headers = new HttpHeaders();


  private basketSource = new BehaviorSubject<IBsaket>(null);
  basket$ = this.basketSource.asObservable();
  
  constructor(private http : HttpClient) 
  {
  }

  getListOrder () 
  {
    var headers = this.headers.set('Authorization',`Bearer ${this.token}`);
    return this.http.get<IOrderDis[]>(this.baseUrl+'order/getforadmin',{headers});
  }

  confirmOrder(id : number) 
  {
    var headers = this.headers.set('Authorization',`Bearer ${this.token}`);
    return this.http.put(this.baseUrl+'order/confirm',id,{headers});
  }
  waitingOrder(id : number) 
  {
    var headers = this.headers.set('Authorization',`Bearer ${this.token}`);
    return this.http.put(this.baseUrl+'order/waiting',id,{headers});
  }
  cancelOrder(id : number) 
  {
    var headers = this.headers.set('Authorization',`Bearer ${this.token}`);
    return this.http.put(this.baseUrl+'order/cancel',id,{headers});
  }

  getBasket(id: number){
    return this.http.get(this.baseUrl+'basket?id='+id)
                  .pipe(
                    map((basket:IBsaket)=>{
                      this.basketSource.next(basket);
                      //this.calculateTotals();
                      console.log("basket test : ");
                      console.log(this.basketSource.value);
                    })
                  );
  }
}
