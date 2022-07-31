import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-nav-bar-admin',
  templateUrl: './nav-bar-admin.component.html',
  styleUrls: ['./nav-bar-admin.component.scss']
})
export class NavBarAdminComponent implements OnInit {

  constructor(private accountService : AccountService) { }

  ngOnInit() {
  }

  logoutAdmin(){
    this.accountService.logoutAdmin();
  }
}
