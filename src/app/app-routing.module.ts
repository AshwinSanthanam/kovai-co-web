import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard } from './helpers/auth-guard/admin-auth.guard.';
import { AdminUserAuthGuard } from './helpers/auth-guard/admin-user-auth.guard';
import { NoLogin } from './helpers/auth-guard/no-login.guard';
import { CheckoutComponent } from './main/checkout/checkout.component';
import { MainComponent } from './main/main.component';
import { ProductBrowseComponent } from './main/product-browse/product-browse.component';
import { SignupComponent } from './signup/signup.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  { path: 'signup/:admin', component: SignupComponent, canActivate: [NoLogin] },
  { path: 'signup', component: SignupComponent,  },
  { path: 'login/:admin', component: UserLoginComponent, canActivate: [NoLogin] },
  { path: 'login', component: UserLoginComponent, canActivate: [NoLogin] },
  { 
    path: '',
    component: MainComponent,
    children: [
      { path: 'product-browse', component: ProductBrowseComponent, canActivate: [AdminUserAuthGuard] },
      { path: 'product-browse/:admin', component: ProductBrowseComponent, canActivate: [AdminAuthGuard] },
      { path: 'checkout', component: CheckoutComponent, canActivate: [AdminUserAuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
