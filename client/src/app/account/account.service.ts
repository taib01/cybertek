import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { IUser, IUser2 } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
baseUrl = environment.apiUrl
public currentUserSource= new BehaviorSubject<IUser2>(null);
currentUser$ = this.currentUserSource.asObservable();

constructor(private http : HttpClient, private router : Router  /* private app :AppComponent */) { }

getCurrentUserValue(){
  return this.currentUserSource.value;

}

loadCurrentUser(token :string){
   let headers = new HttpHeaders();
   //var token = localStorage.getItem('token');
   headers = headers.set('Authorization',`Bearer ${token}`);

   return this.http.get(this.baseUrl+'account',{headers}).pipe(
     map((user:IUser2)=>{
       if (user) {
         localStorage.setItem('token',user.token);
         //localStorage.setItem('phone',user.phoneNumber); 
         //localStorage.setItem('adress',user.adress.street+"-" + user.adress.city +"-" +user.adress.state); 
         this.currentUserSource.next(user);
       }
     })
   );
}

login(values : any){
  return this.http.post(this.baseUrl+'account/login', values).pipe(
    map((user:IUser2)=>
    {
      if (user){
        console.log(user);
        this.currentUserSource.next(user);
        localStorage.setItem('token',user.token);
        //localStorage.setItem('phone',user.phoneNumber); 
        //localStorage.setItem('adress',user.adress.street+"-" + user.adress.city +"-" +user.adress.state); 
        
      }
    })
  );
  
}

loginAdmin(values : any){
  return this.http.post(this.baseUrl+'account/loginadmin', values).pipe(
    map((user:IUser2)=>
    {
      if (user){
        console.log(user);
        this.currentUserSource.next(user);
        localStorage.setItem('token',user.token);
        localStorage.setItem('token-admin',user.token);
        //this.app.testAdmin="";
        //localStorage.setItem('phone',user.phoneNumber); 
        //localStorage.setItem('adress',user.adress.street+"-" + user.adress.city +"-" +user.adress.state); 
            this.router.navigate(['/admin']).then(()=>{
            window.location.reload();
          }) ;
        
      }
    })
  ); 
}

register(values : any){
  return this.http.post(this.baseUrl+'account/registerwithadress', values).pipe(
    map((user:IUser2)=>
    {
      if (user){
        localStorage.setItem('token',user.token); 
        //localStorage.setItem('phone',user.phoneNumber); 
        //localStorage.setItem('adress',user.adress.street + "-" + user.adress.city + "-" +user.adress.state); 
        this.currentUserSource.next(user);
      }
    })
  );
}

logout(){
localStorage.removeItem('token');
//localStorage.removeItem('phone');
//localStorage.removeItem('adress');
this.currentUserSource.next(null);
this.router.navigateByUrl('/');
}

logoutAdmin(){
  localStorage.removeItem('token');
  localStorage.removeItem('token-admin');
  //localStorage.removeItem('phone');
  //localStorage.removeItem('adress');
  this.currentUserSource.next(null);
  this.router.navigate(['/shop']).then(()=>{
    window.location.reload();
  }) ;
  
  }

checkEmailExists(email : string){
  return this.http.get(this.baseUrl+'/account/emailexists='+email);
}


udateUser(values : any){
  let headers = new HttpHeaders();
  var token = localStorage.getItem('token');
  headers = headers.set('Authorization',`Bearer ${token}`);
  return this.http.put(this.baseUrl+'account', values,{headers}).pipe(
    map((user:IUser2)=>
    {
      if (user){
        localStorage.setItem('token',user.token); 
        //localStorage.setItem('phone',user.phoneNumber); 
        //localStorage.setItem('adress',user.adress.street + "-" + user.adress.city + "-" +user.adress.state); 
        //this.currentUserSource.next(user);
      }
    })
  );
}

}
