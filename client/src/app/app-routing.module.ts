import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AddeditproductComponent } from './components/addeditproduct/addeditproduct.component';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { ShopComponent } from './shop/shop.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { ProductDetailedResolver } from './_resolvers/product-detailed.resolver';
import { SingleComponent } from './components/single/single.component';

const routes: Routes = [
  {path: '',  component: HomeComponent},
  {path: 'shop',  component: ShopComponent},
  {path: 'checkout',  component: CheckoutComponent },
  {path: 'profile',  component: ProfileComponent,},
  {path: 'order',  component: OrderComponent},
  {path: 'edit/:id',  component: AddeditproductComponent},
  {path: 'single/:id', component: SingleComponent, resolve: {product: ProductDetailedResolver}},
  {path: 'admin',  component: AdminComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
