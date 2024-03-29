import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { PaginationModule } from 'ngx-bootstrap';
import { IProduct } from '../shared/models/product';
import { IBrand } from '../shared/models/productBrand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']

})
export class ShopComponent implements OnInit {
  products : IProduct[];
  brands : IBrand[];
  types : IType[];
  shopParams = new ShopParams();
  totalCount: number ; 
  sortOption = [
    {name : 'Alphabétique' , value : 'name'},
    {name : 'Prix : ​​Croissant' , value : 'priceAsc'},
    {name : 'Prix : Décroissant' , value : 'priceDesc'},
  ]
  @ViewChild('search',{static:true}) searchTerm:ElementRef;

  constructor( private shopService : ShopService) { }

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe(response=>
      {
      this.products = response.data ;
      this.shopParams.pageNumber=response.pageIndex;
      this.shopParams.pageSize=response.pageSize;
      this.totalCount=response.count;
      },error =>
      {
       console.log(error); 
      });
  }

  getBrands(){
    this.shopService.getBrands().subscribe((response)=>
    {
      this.brands =[{id:0,name:'All'}, ...response];
    },error =>
    {
      console.log(error); 
    });
  }

  getTypes(){
    this.shopService.getTypes().subscribe((response)=>
    {
      this.types = [{id:0,name:'All'}, ...response];
    },error =>
    {
      console.log(error); 
    });
  }

  onBrandSelected(brandId : number){
    this.shopParams.brandId = brandId ;
    this.shopParams.pageNumber=1; 
    this.getProducts(); 
  }

  onTypeSelected(typeId:number){
    this.shopParams.typeId =typeId;
    this.shopParams.pageNumber=1; 
    this.getProducts(); 
  }

  onSortSelected(sort:string){
    this.shopParams.sort =sort;
    this.getProducts(); 
  }

  onPageChange(event : any ){
    if(this.shopParams.pageNumber !== event){
    //this.shopParams.pageNumber=event.page;
    this.shopParams.pageNumber=event;
    this.getProducts();
    }

  }

  onSearch(){
   this.shopParams.search = this.searchTerm.nativeElement.value;
   this.shopParams.pageNumber=1; 
   this.getProducts(); 
  }
  onReset(){
    this.searchTerm.nativeElement.value = "";
    this.shopParams=new ShopParams() ; 
    this.getProducts();
  }
  

}

  

