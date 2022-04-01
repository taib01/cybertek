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

  getProducts(shopParams){
    let params = new HttpParams();

    if(shopParams.brandId !== 0){
      params = params.append('brandId',shopParams.brandId.toString());
    }

    if(shopParams.typeId !== 0){
      params = params.append('typeId',shopParams.typeId.toString());
    }

    
      params = params.append('sort',shopParams.sort);
      params = params.append('pageIndex',shopParams.pageNumber.toString());
      params = params.append('pageSize',shopParams.pageSize.toString());
    

    return this.http.get<IPagination>(this.baseUrl, {observe:'response',params})
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
