import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrderDis } from 'src/app/shared/models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl ; 
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders();
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

}
