import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IBrand } from 'src/app/shared/models/productBrand';
import { IType } from 'src/app/shared/models/productType';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  public message : string  ; 
  public progress : number ; 

  productDetail : FormGroup ;
  private productType :string ; 
  private productBrand :string  ;

  private product = {
    id: 0,
    reference: "",
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    pictureUrl: "",
    productTypeId: 0,
    productBrandId: 0,
    productType:"",
    productBrand:""
  }

  brandsForProduct : IBrand[];
  typesForProduct : IType[];


  constructor( private serv :AdminService, builder :FormBuilder, private route : ActivatedRoute , http :HttpClient) { 
    
    this.productDetail=builder.group({
      id: 0,
      reference: "",
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      pictureUrl: "",
      productTypeId: null,
      productBrandId: null,
      productType:"",
      productBrand:""
    });

    this.product.id=this.route.snapshot.params.id ;
    this.product.reference=this.route.snapshot.params.reference ;
    this.product.name=this.route.snapshot.params.name ;
    this.product.description=this.route.snapshot.params.description ;
    this.product.price=this.route.snapshot.params.price ;
    this.product.quantity=this.route.snapshot.params.quantity ;
    this.product.pictureUrl=this.route.snapshot.params.pictureUrl ;
    this.productType=this.route.snapshot.params.productType ;
    this.productBrand=this.route.snapshot.params.productBrand ;
    
     

}
  ngOnInit() {
    this.getBrands();
    this.getTypes();
    console.log(this.serv.getDate());
  }

  getBrands(){
    this.serv.getBrands().subscribe((response)=>
    {

      this.brandsForProduct=[...response];
    },error =>
    {
      console.log(error); 
    });
  }

  getTypes(){
    this.serv.getTypes().subscribe((response)=>
    {

      this.typesForProduct=[...response];
    },error =>
    {
      console.log(error); 
    });
  }

  uploadfile(files) {
    if (files.lenghth === 0 )
    return ; 
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file',fileToUpload,fileToUpload.name);
    this.serv.uploadFile(formData)
    .subscribe(event =>{
      if (event.type === HttpEventType.UploadProgress){
        this.progress = Math.round(100* event.loaded / event.total);
      }
      else if ( event.type === HttpEventType.Response){
        this.message = 'Uploas success.';
       //this.onUploadFinished.emit(event.body);
      }
    });
    var newproduct = {
      id: this.product.id,
      reference: this.product.reference,
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      quantity: this.product.quantity,
      pictureUrl: "",
      productTypeId: this.product.productTypeId,
      productBrandId: this.product.productBrandId

    }
    newproduct.pictureUrl = fileToUpload.name;
    //console.log(newproduct);
    this.serv.updateProduct(newproduct);
    //window.location.reload();
  } 
}
