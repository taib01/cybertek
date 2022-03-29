import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/productBrand';
import { IType } from '../shared/models/productType';

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

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl+'/brands');
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl+'/types');
  }

}
