import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Builder } from 'protractor';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.scss']
})
export class UpdateBrandComponent implements OnInit {

  brandDetail : FormGroup ;

  private brand = {
      id: 0 ,
      name:""

  };

  constructor( private serv : AdminService , builder : FormBuilder, private route :ActivatedRoute) {
      this.brandDetail=builder.group({
        id:0,
        name:""
      });
      this.brand.id=this.route.snapshot.params.id; 
      this.brand.name=this.route.snapshot.params.name;
  }

  ngOnInit() {
  }
  
  updatebrand(){
    this.serv.updateBrand(this.brand);
  }
}
