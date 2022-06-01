import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TabHeadingDirective } from 'ngx-bootstrap';
import { map } from 'rxjs/operators';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IBrand } from '../shared/models/productBrand';
import { IType } from '../shared/models/productType';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrlAll='https://localhost:5001/api/products?pageSize=50';
  baseUrl= 'https://localhost:5001/api/products';


  constructor( private http: HttpClient , private route : Router) { }

  getProducts(shopParams){
    let params = new HttpParams();

    if(shopParams.brandId !== 0){
      params = params.append('brandId',shopParams.brandId.toString());
    }

    if(shopParams.typeId !== 0){
      params = params.append('typeId',shopParams.typeId.toString());
    }

    if(shopParams.search ){
      params = params.append('search',shopParams.search);
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

  getProduct(id : number){
    return this.http.get<IProduct>(this.baseUrl+'/'+id);
  }
  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl+'/brands');
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl+'/types');
  }



  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl+'?id='+id).subscribe(()=>
    {
      console.log('success deleting'); 
      this.route.navigateByUrl('/admin');
    },error =>{
      console.log(error);
    });
  }

  deleteBrand(id: number) {
    return this.http.delete(this.baseUrl+'/brand?id='+id).subscribe(()=>
    {
      console.log('success deleting'); 

      this.route.navigateByUrl('/admin');
    },error =>{
      console.log(error);
    });
  }

  deleteType(id: number) {
    return this.http.delete(this.baseUrl+'/type?id='+id).subscribe(()=>
    {
      console.log('success deleting'); 

      this.route.navigateByUrl('/admin');
    },error =>{
      console.log(error);
    });
  }

  addBrand(item : object){
    return this.http.post(this.baseUrl+'/brand',item).subscribe(()=>
    {console.log('adding brand success');
  },error =>{
    console.log(error);
  });
  }
  addType(item : object){
    return this.http.post(this.baseUrl+'/type',item).subscribe(()=>
    {console.log('adding type success');
  },error =>{
    console.log(error);
  });
  }

  addProduct(item : object){
    return this.http.post(this.baseUrl,item).subscribe(()=>
    {console.log('adding product success');
    //this.route.navigateByUrl('/admin');
  },error =>{
    console.log(error);
  });
  }

  uploadFile(DataFormData){
    return this.http.post(this.baseUrl+'/image',DataFormData,{reportProgress:true , observe : 'events'})
  }

  updateBrand(item : object){
    return this.http.put(this.baseUrl+'/brand',item).subscribe(()=>
    {console.log('updating brand success');
    this.route.navigateByUrl('/admin');
  },error =>{
    console.log(error);
  });
  }

  updateType(item : object){
    return this.http.put(this.baseUrl+'/type',item).subscribe(()=>
    {console.log('updating type success');
    this.route.navigateByUrl('/admin');
  },error =>{
    console.log(error);
  });
  }

}
  

 
