import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-update-type',
  templateUrl: './update-type.component.html',
  styleUrls: ['./update-type.component.scss']
})
export class UpdateTypeComponent implements OnInit {

  adminTest = localStorage.getItem("token-admin"); 

  typeDetail : FormGroup ;
  msgErreur :string; 

  private type = {
      id: "" ,
      name:""

  };

  constructor( private serv :AdminService, builder : FormBuilder,private route: ActivatedRoute)  { 
    this.typeDetail=builder.group({
      id:"",
      name:""
    });
    this.type.id=this.route.snapshot.params.id; 
    this.type.name=this.route.snapshot.params.name;
}

  ngOnInit() {
  }

  updatetype(){
    if(this.type.name == "" )
    {
      this.msgErreur = "Inserer la catégorie"
      setTimeout(()=>{ this.msgErreur  = '' ;}, 2500);
      return;
    }
    this.serv.updateType(this.type);
  }
}
