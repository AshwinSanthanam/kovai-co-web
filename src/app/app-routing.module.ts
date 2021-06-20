import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserAuthGuard } from './helpers/auth-guard/admin-user-auth.guard';
import { MainComponent } from './main/main.component';
import { ProductBrowseComponent } from './main/product-browse/product-browse.component';
import { SignupComponent } from './signup/signup.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login/:admin', component: UserLoginComponent },
  { path: 'login', component: UserLoginComponent },
  { 
    path: '', 
    component: MainComponent,
    children: [
      { path: 'product-browse', component: ProductBrowseComponent, canActivate: [AdminUserAuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
