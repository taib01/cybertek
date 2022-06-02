import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
//import { EventEmitter } from 'protractor';
import { IProduct } from '../shared/models/product';
import { IBrand } from '../shared/models/productBrand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from '../shop/shop.service';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  newbrand = new FormGroup({
    id: new FormControl(0), 
    name: new FormControl('')
  });

  newtype = new FormGroup({
    id: new FormControl(0), 
    name: new FormControl('')
  });

  newproduct = new FormGroup({
    // badelt l Id b id *** 
    id: new FormControl(0), 
    reference: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    pictureUrl: new FormControl(''),
    productTypeId: new FormControl(''),
    productBrandId: new FormControl('')
  });
  
  public message : string  ; 
  public progress : number ; 
  @Output() public onUploadFinished = new EventEmitter(); 


  products : IProduct[];
  brands : IBrand[];
  types : IType[];
  brandsForProduct : IBrand[];
  typesForProduct : IType[];
  shopParams = new ShopParams();
  totalCount: number ; 
  sortOption = [
    {name : 'Alphabetical' , value : 'name'},
    {name : 'Price: Low to High' , value : 'priceAsc'},
    {name : 'Price: High to Low' , value : 'priceDesc'},
  ]
  @ViewChild('search',{static:true}) searchTerm:ElementRef;

  constructor(private  adminService : AdminService ,private http : HttpClient) { }

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.adminService.getProducts(this.shopParams).subscribe(response=>
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
    this.adminService.getBrands().subscribe((response)=>
    {
      this.brands =[{id:0,name:'All'}, ...response];
      this.brandsForProduct=[...response];
      this.adminService.brandsForProduct=[...response];
    },error =>
    {
      console.log(error); 
    });
  }

  getTypes(){
    this.adminService.getTypes().subscribe((response)=>
    {
      this.types = [{id:0,name:'All'}, ...response];
      this.typesForProduct=[...response];
      this.adminService.typesForProduct=[...response];
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



  deleteproduct(id){
    this.adminService.deleteProduct(id);
    var i=this.products.findIndex(a=> a.id === id ); 
    this.products.splice(i,1);
    window.location.reload();
  }
  deletebrand(id){
    this.adminService.deleteBrand(id);
    //var i=this.brands.findIndex(a=> a.id=== id ); 
    //this.brands.splice(i,1);
    window.location.reload();
  }
  deletetype(id){
    this.adminService.deleteType(id);
    //var i=this.brands.findIndex(a=> a.id=== id ); 
    //this.brands.splice(i,1);
    window.location.reload();
  }

  addbrand(){
    this.adminService.addBrand(this.newbrand.value) ; 
    window.location.reload();
    
  }
  addtype(){
    this.adminService.addType(this.newtype.value) ; 
    window.location.reload();
  }

  uploadfile(files) {
    if (files.lenghth === 0 )
    return ; 
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    //formData.append('product',this.newproduct.value);
    formData.append('file',fileToUpload,/* this.adminService.getDate()+ */fileToUpload.name);
    this.adminService.uploadFile(formData)
    .subscribe(event =>{
      if (event.type === HttpEventType.UploadProgress){
        this.progress = Math.round(100* event.loaded / event.total);
      }
      else if ( event.type === HttpEventType.Response){
        this.message = 'Uploas success.';
       //this.onUploadFinished.emit(event.body);
      }
    });
    this.newproduct.value.pictureUrl = fileToUpload.name;
    this.newproduct.value.pictureUrl =  /* this.adminService.getDate()+ */this.newproduct.value.pictureUrl ;
    this.adminService.addProduct(this.newproduct.value);
    window.location.reload();
  }
  

}
