import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Client';

  constructor() {}

  ngOnInit(): void {
    /*
    this.http.get('https://localhost:5001/api/products?pageSize=50')
             .subscribe((response:IPagination) =>{
               this.products=response.data;
               //console.log(response.data);
             },error =>{
               console.log(error);
             });
    */

         
  }
}
