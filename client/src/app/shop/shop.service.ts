import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrlAll='https://localhost:5001/api/products?pageSize=50';
  baseUrl= 'https://localhost:5001/api/products';

  constructor( private http: HttpClient) { }

  getProducts(){
    return this.http.get<IPagination>(this.baseUrlAll);
  }

}
