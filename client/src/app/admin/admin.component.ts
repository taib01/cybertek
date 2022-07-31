import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  
  ErrorMsg1 :string ;
  ErrorMsg2 :string ;
  ErrorMsg3 :string ;
  adminTest =localStorage.getItem("token-admin");

  newbrand = new FormGroup({
    id: new FormControl(0), 
    name: new FormControl(null)
  });

  newtype = new FormGroup({
    id: new FormControl(0), 
    name: new FormControl(null)
  });

  newproduct :FormGroup ;

  
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
    {name : 'Alphabétique' , value : 'name'},
    {name : 'Prix : ​​Croissant' , value : 'priceAsc'},
    {name : 'Prix : Décroissant' , value : 'priceDesc'},
  ]
  @ViewChild('search',{static:true}) searchTerm:ElementRef;

  constructor(private  adminService : AdminService ,private http : HttpClient ,private builder : FormBuilder) { }

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
    this.createNewProductForm();


  }

  createNewProductForm(){
    this.newproduct = this.builder.group({
      // badelt l Id b id *** 
      id: new FormControl(0), 
      reference: [null,[Validators.required]],
      name:[null,[Validators.required]],
      description:[null,[Validators.required]],
      price: [null,[Validators.required,Validators.pattern("^[0-9]+$")]],
      quantity:[null,[Validators.required,Validators.pattern("^[0-9]+$")]],
      pictureUrl: new FormControl(""), 
      productTypeId: [null,[Validators.required]],
      productBrandId: [null,[Validators.required]]
      //file:[null]
    });
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
      this.brands =[{id:0,name:'Le tout'}, ...response];
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
      this.types = [{id:0,name:'Le tout'}, ...response];
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
    if (this.newbrand.value.name === null){
      this.ErrorMsg2= "Inserer la marque";
      setTimeout(()=>{ this.ErrorMsg2 = '' ;}, 2500);
      return;
    }else{
      this.adminService.addBrand(this.newbrand.value) ; 
      window.location.reload();
    }

    
  }
  addtype(){
    if (this.newtype.value.name === null){
      this.ErrorMsg3= "Inserer la catégorie";
      setTimeout(()=>{ this.ErrorMsg3 = '' ;}, 2500);
      return;
    }else{
      this.adminService.addType(this.newtype.value) ; 
      window.location.reload();
    }

  }

  uploadfile(files) {
    if (files.length === 0 || this.newproduct.invalid){
     this.ErrorMsg1= "Remplir tous les champs";
     setTimeout(()=>{ this.ErrorMsg1 = '' ;}, 2500);
    return ; 
    }
    else{
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
  

}
