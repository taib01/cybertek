import { identifierModuleUrl } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';
//import { ProductDetailsComponent } from './shop/product-details/product-details.component';
//import { ShopComponent } from './shop/shop.component';


const routes: Routes = [
  {path:'', component: HomeComponent },
  {path:'test-error', component: TestErrorComponent },
  {path:'server-error', component: ServerErrorComponent },
  {path:'not-found', component: NotFoundComponent },
  {path:'contact', component: ContactComponent },
  //{path:'admin', component: AdminComponent },
  

  //{path:'shop', component: ShopComponent},
  //{path:'shop/:id' , component :ProductDetailsComponent},
  {path:'order', loadChildren:()=> import('./admin/order/order.module').then(mod=>mod.OrderModule)},
  {path:'admin', loadChildren:()=> import('./admin/admin.module').then(mod => mod.AdminModule)},
  {path:'shop', loadChildren:()=> import('./shop/shop.module').then(mod => mod.ShopModule),data:{breadcrumb:'shop'}},
  {path:'basket', loadChildren:()=> import('./basket/basket.module').then(mod => mod.BasketModule)},
  //{path:'checkout', canActivate:[AuthGuard] ,  loadChildren:()=> import('./checkout/checkout.module').then(mod => mod.CheckoutModule)},
  {path:'checkout',  loadChildren:()=> import('./checkout/checkout.module').then(mod => mod.CheckoutModule)},
  {path:'account', loadChildren:()=> import('./account/account.module').then(mod => mod.AccountModule)},


  {path:'**',redirectTo:'',pathMatch:'full'}
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


