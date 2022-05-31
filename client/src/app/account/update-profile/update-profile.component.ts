import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {


    /*userDetail = new FormGroup({
    email: new FormControl(''), 
    displayName: new FormControl(''), 
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zipcode: new FormControl(''),
    phoneNumber: new FormControl('')
  });*/



  // create reactive form with to way bandin method
  private displayName : string ;
  private firstName : string ;
  private lastName: string ;
  private street: string ;
  private city: string ;
  private state: string ;
  private zipcode: string ;
  private phoneNumber:string;

  userDetail : FormGroup ;

  private user = {
      displayName: "" ,
      adress :{
        firstName : "" ,
        lastName: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
      },
      phoneNumber: ""

  };

  constructor( private accountService : AccountService , builder : FormBuilder) {
    //window.location.reload();
    this.userDetail=builder.group({
      displayName :"",//this.accountService.getCurrentUserValue().displayName,
      firstName : "",//this.accountService.getCurrentUserValue().adress.firstName,
      lastName : "",//this.accountService.getCurrentUserValue().adress.lastName,
      street : "",//this.accountService.getCurrentUserValue().adress.street,
      city : "" ,//this.accountService.getCurrentUserValue().adress.city,
      state : "" ,//this.accountService.getCurrentUserValue().adress.state,
      zipcode : "",//this.accountService.getCurrentUserValue().adress.zipcode,
      phoneNumber : ""//this.accountService.getCurrentUserValue().phoneNumber
    });


    this.displayName= this.accountService.currentUserSource.value.displayName ? this.accountService.currentUserSource.value.displayName : '';
    this.firstName = this.accountService.currentUserSource.value.adress.firstName !=null ? this.accountService.currentUserSource.value.adress.firstName : '';
    this.lastName= this.accountService.currentUserSource.value.adress.lastName;
    this.street= this.accountService.currentUserSource.value.adress.street;
    this.city= this.accountService.currentUserSource.value.adress.city ;
    this.state= this.accountService.currentUserSource.value.adress.state ;
    this.zipcode= this.accountService.currentUserSource.value.adress.zipcode ;
    this.phoneNumber= this.accountService.currentUserSource.value.phoneNumber ;
   }

  ngOnInit() :void{
    //var tokenUser = localStorage.getItem('token');
    //this.accountService.loadCurrentUser(tokenUser);
    //location.reload();
    
    this.loadUser();
    console.log(this.accountService.getCurrentUserValue());
    this.userDetail.value.email =this.accountService.getCurrentUserValue().email;
    this.userDetail.value.displayName =this.accountService.getCurrentUserValue().displayName;
    //this.accountService.getCurrentUserValue

  }
  UpdateUsar(){
    this.user.displayName=this.displayName;
    this.user.phoneNumber=this.phoneNumber;
    this.user.adress.firstName=this.firstName;
    this.user.adress.lastName=this.lastName;
    this.user.adress.street=this.street
    this.user.adress.city=this.city;
    this.user.adress.state=this.state;
    this.user.adress.zipcode=this.zipcode; 

    this.accountService.udateUser(this.user ).subscribe(()=> {
      console.log('update_success');
      window.location.reload();
    },error=>{
      console.log(error);
    });
  }

  loadUser(){
    var tokenClient = localStorage.getItem('token');
    if(tokenClient){
      this.accountService.loadCurrentUser(tokenClient).subscribe(()=>{
        console.log('loaded user');
      },error =>{
        console.log(error);
      });
    } 
  }

    
  
}
