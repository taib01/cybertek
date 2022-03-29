import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/productBrand';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrlAll='https://localhost:5001/api/products?pageSize=50';
  baseUrl= 'https://localhost:5001/api/products';

  constructor( private http: HttpClient) { }

  getProducts(brandId?: number, typeId?:number , sort?:string){
    let params = new HttpParams();

    if(brandId){
      params = params.append('brandId',brandId.toString());
    }

    if(typeId){
      params = params.append('typeId',typeId.toString());
    }

    if(sort){
      params = params.append('sort',sort);
    }
    return this.http.get<IPagination>(this.baseUrlAll, {observe:'response',params})
      .pipe(
         map(response => {
          return response.body;
        })
      );
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl+'/brands');
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl+'/types');
  }

}
