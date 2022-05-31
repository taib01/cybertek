import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IOrderDis } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl ; 

  constructor(private http : HttpClient) { }

  getListOrder () {


    var headers = new HttpHeaders();
    var token = localStorage.getItem('token');
    headers = headers.set('Authorization',`Bearer ${token}`);
 
    return this.http.get<IOrderDis[]>(this.baseUrl+'order/getforuser',{headers});

    }

}
